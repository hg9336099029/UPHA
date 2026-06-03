from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .models import District
from users.utils import get_request_data, json_error, json_success, serialize_district


@csrf_exempt
@require_http_methods(['POST'])
def register_district(request):
    data = get_request_data(request)
    files = request.FILES

    required_fields = [
        'name', 'district', 'year_of_establishment', 'trust_registration_number',
        'office_address', 'office_phone_number', 'email', 'no_of_players',
        'registration_certificate', 'transaction_id', 'transaction_image', 'logo',
    ]
    missing_fields = [field for field in required_fields if not (data.get(field) or files.get(field))]
    if missing_fields:
        return json_error(f"Missing required fields: {', '.join(missing_fields)}")

    try:
        district = District.objects.create(
            name=data.get('name', ''),
            district=data.get('district', ''),
            year_of_establishment=int(data.get('year_of_establishment')),
            logo=files.get('logo'),
            trust_registration_number=data.get('trust_registration_number', ''),
            office_address=data.get('office_address', ''),
            office_phone_number=data.get('office_phone_number', ''),
            email=data.get('email', ''),
            website=data.get('website') or None,
            no_of_players=int(data.get('no_of_players')),
            adhyaksha_id=data.get('adhyaksha_id') or None,
            sachiv_id=data.get('sachiv_id') or None,
            koshadhyaksha_id=data.get('koshadhyaksha_id') or None,
            registration_certificate=files.get('registration_certificate'),
            transaction_id=data.get('transaction_id', ''),
            transaction_image=files.get('transaction_image'),
            paid=str(data.get('paid', '')).lower() in {'true', '1', 'yes'},
        )
    except Exception as exc:
        return json_error(str(exc))

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
    return json_success('District payment status updated successfully.', district=serialize_district(request, district))
