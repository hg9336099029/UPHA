from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.db import IntegrityError, transaction

from .models import District
from users.utils import get_request_data, json_error, json_success, serialize_district, notify_admins


from django.contrib.auth.hashers import make_password
from users.models import User

@csrf_exempt
@require_http_methods(['POST'])
def register_district(request):
    data = get_request_data(request)
    files = request.FILES

    required_district_fields = [
        'name', 'district', 'year_of_establishment',
        'office_address', 'office_phone_number', 'email', 'password', 'no_of_players',
        'transaction_id', 'transaction_image', 'logo',
    ]
    missing_fields = [field for field in required_district_fields if not (data.get(field) or files.get(field))]
    if missing_fields:
        readable = [f.replace('_', ' ').title() for f in missing_fields]
        return json_error(f"The following required fields are missing: {', '.join(readable)}. Please fill them in before submitting.")
    
    district_email = data.get('email')
    if User.objects.filter(email=district_email).exists():
        return json_error(f'The office email "{district_email}" is already registered. Please use a different email.')

    # Helper function to create a user for an office bearer
    def create_office_bearer(prefix):
        email = data.get(f'{prefix}_email')
        adhar = data.get(f'{prefix}_adhar_number')
        if not email or not adhar:
            role_name = prefix.replace('_', ' ').title()
            raise ValueError(f"Missing Email or Aadhar number for {role_name}. Both are required to create their login account.")
        
        # Check if user already exists
        user = User.objects.filter(email=email).first()
        if user:
            return user

        # Check adhar uniqueness
        if User.objects.filter(adhar_number=adhar).exists():
            role_name = prefix.replace('_', ' ').title()
            raise ValueError(
                f'The Aadhar number "{adhar}" entered for {role_name} is already registered in the system. '
                'Each individual can only appear as an office bearer once.'
            )

        # Use create_user so the CustomUserManager auto-generates a unique username
        user = User.objects.create_user(
            email=email,
            password=adhar,           # Default password is their adhar number
            name=data.get(f'{prefix}_name', ''),
            father_name=data.get(f'{prefix}_father_name', ''),
            phone_number=data.get(f'{prefix}_phone_number', ''),
            adhar_number=adhar,
            role='admin',
        )

        # Attach uploaded files (requires a second save because ImageField needs the pk)
        needs_save = False
        if files.get(f'{prefix}_adhar_image'):
            user.adhar_image = files[f'{prefix}_adhar_image']
            needs_save = True
        if files.get(f'{prefix}_passport_image'):
            user.passport_image = files[f'{prefix}_passport_image']
            needs_save = True
        if needs_save:
            user.save()

        return user

    try:
        with transaction.atomic():
            adhyaksha = create_office_bearer('adhyaksha')
            sachiv = create_office_bearer('sachiv')
            koshadhyaksha = create_office_bearer('koshadhyaksha')

            district_user = User.objects.create_user(
                email=district_email,
                password=data.get('password'),
                name=data.get('name', ''),
                phone_number=data.get('office_phone_number', ''),
                role='district'
            )

            district = District.objects.create(
                user=district_user,
                name=data.get('name', ''),
                district=data.get('district', ''),
                year_of_establishment=int(data.get('year_of_establishment')),
                logo=files.get('logo'),
                trust_registration_number=data.get('trust_registration_number', ''),
                office_address=data.get('office_address', ''),
                office_phone_number=data.get('office_phone_number', ''),
                email=district_email,
                website=data.get('website') or None,
                no_of_players=int(data.get('no_of_players')),
                adhyaksha=adhyaksha,
                sachiv=sachiv,
                koshadhyaksha=koshadhyaksha,
                registration_certificate=files.get('registration_certificate'),
                transaction_id=data.get('transaction_id', ''),
                transaction_image=files.get('transaction_image'),
                paid=str(data.get('paid', '')).lower() in {'true', '1', 'yes'},
            )
    except ValueError as ve:
        return json_error(str(ve))
    except IntegrityError as e:
        error_msg = str(e).lower()
        if 'trust_registration_number' in error_msg:
            return json_error('A unit with this Society/Trust Registration Number is already registered.')
        if 'name' in error_msg:
            return json_error('A unit with this name is already registered.')
        if 'transaction_id' in error_msg:
            return json_error('This transaction ID has already been used.')
        return json_error('Registration failed due to duplicate information provided. Please check your data.')
    except Exception as exc:
        return json_error(str(exc))

    notify_admins('New District Unit Application', f'{district.name} has submitted a new district unit application from {district.district}.')

    return json_success('District registered successfully.', district=serialize_district(request, district))



@require_http_methods(['GET'])
def list_districts(request):
    districts = District.objects.select_related('adhyaksha', 'sachiv', 'koshadhyaksha').all().order_by('id')
    return json_success('Districts retrieved successfully.', districts=[serialize_district(request, d) for d in districts])


@csrf_exempt
@require_http_methods(['POST'])
def update_district_payment_status(request, district_id):
    district = District.objects.select_related('adhyaksha', 'sachiv', 'koshadhyaksha').filter(pk=district_id).first()
    if not district:
        return json_error('District not found.', status=404)

    data = get_request_data(request)
    paid = str(data.get('paid', 'true')).lower() in {'true', '1', 'yes', 'on'}
    district.paid = paid
    district.save(update_fields=['paid'])
    if paid:
        from users.utils import log_decision, create_user_notification
        log_decision(
            request, 'district', district.id, 'Approved',
            f"{district.name} (APP-DST-{district.id:05d})",
            f"District ID DST-2026-{district.id:05d} issued",
            data.get('notes', '')
        )
        for user in [district.adhyaksha, district.sachiv, district.koshadhyaksha]:
            if user:
                create_user_notification(
                    user,
                    "District Registration Approved",
                    f"Registration for district unit '{district.name}' has been approved."
                )
    return json_success('District payment status updated successfully.', district=serialize_district(request, district))
