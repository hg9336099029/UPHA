from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.db import IntegrityError, transaction

from .models import Academy, AcademyFacilityPhoto
from users.models import User
from users.utils import get_request_data, json_error, json_success, serialize_academy


@csrf_exempt
@require_http_methods(['POST'])
def register_academy(request):
	data = get_request_data(request)
	files = request.FILES

	required_fields = [
		'name', 'district', 'year_of_establishment',
		'office_address', 'office_phone_number', 'email', 'password', 'no_of_players',
		'transaction_id', 'transaction_image', 'logo',
	]
	missing_fields = [field for field in required_fields if not (data.get(field) or files.get(field))]
	if missing_fields:
		readable = [f.replace('_', ' ').title() for f in missing_fields]
		return json_error(f"The following required fields are missing: {', '.join(readable)}. Please fill them in before submitting.")

	academy_email = data.get('email')
	if User.objects.filter(email=academy_email).exists():
		return json_error(f'The office email "{academy_email}" is already registered. Please use a different email.')

	def create_office_bearer(prefix):
		email = data.get(f'{prefix}_email')
		adhar = data.get(f'{prefix}_adhar_number')
		dob = data.get(f'{prefix}_dob') or None
		if not email or not adhar:
			role_name = prefix.replace('_', ' ').title()
			raise ValueError(f"Missing Email or Aadhar number for {role_name}. Both are required to create their login account.")
		
		user = User.objects.filter(email=email).first()
		if user:
			return user

		if User.objects.filter(adhar_number=adhar).exists():
			role_name = prefix.replace('_', ' ').title()
			raise ValueError(
				f'The Aadhar number "{adhar}" entered for {role_name} is already registered in the system. '
				'Each individual can only appear as an office bearer once.'
			)

		user = User.objects.create_user(
			email=email,
			password=adhar,
			name=data.get(f'{prefix}_name', ''),
			father_name=data.get(f'{prefix}_father_name', ''),
			phone_number=data.get(f'{prefix}_phone_number', ''),
			adhar_number=adhar,
			date_of_birth=dob,
		)

		needs_save = False
		# Check both frontend field names (e.g. director_adhar and director_adhar_image)
		adhar_file = files.get(f'{prefix}_adhar') or files.get(f'{prefix}_adhar_image')
		photo_file = files.get(f'{prefix}_photo') or files.get(f'{prefix}_passport_image')

		if adhar_file:
			user.adhar_image = adhar_file
			needs_save = True
		if photo_file:
			user.passport_image = photo_file
			needs_save = True
		if needs_save:
			user.save()

		return user

	try:
		with transaction.atomic():
			director = create_office_bearer('director')

			academy_user = User.objects.create_user(
				email=academy_email,
				password=data.get('password'),
				name=data.get('name', ''),
				phone_number=data.get('office_phone_number', ''),
				role='academy'
			)

			academy = Academy.objects.create(
				user=academy_user,
				name=data.get('name', ''),
				district=data.get('district', ''),
				year_of_establishment=int(data.get('year_of_establishment')),
				logo=files.get('logo'),
				trust_registration_number=data.get('trust_registration_number', ''),
				office_address=data.get('office_address', ''),
				office_phone_number=data.get('office_phone_number', ''),
				email=academy_email,
				website=data.get('website') or None,
				no_of_players=int(data.get('no_of_players')),
				registration_certificate=files.get('registration_certificate'),
				transaction_id=data.get('transaction_id', ''),
				transaction_image=files.get('transaction_image'),
				paid=str(data.get('paid', '')).lower() in {'true', '1', 'yes'},
				
				# New sync fields
				director=director,
				academy_type=data.get('academy_type', ''),
				discipline_focus=data.get('discipline_focus', ''),
				categories_trained=data.get('categories_trained', ''),
				coach_grade=data.get('coach_grade', ''),
				pin_code=data.get('pin_code', ''),
				training_venue=data.get('training_venue', ''),
				coaches_employed=int(data.get('coaches_employed') or 0),
				address_proof=files.get('address_proof'),
				bank_details=files.get('bank_details'),
			)

			# Save multiple facility photos
			facility_photos = files.getlist('facility_photos')
			for photo in facility_photos:
				AcademyFacilityPhoto.objects.create(
					academy=academy,
					image=photo
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

	return json_success('Academy registered successfully.', academy=serialize_academy(request, academy))


@require_http_methods(['GET'])
def list_academies(request):
	academies = Academy.objects.select_related('director', 'user').prefetch_related('facility_photos').all().order_by('id')
	return json_success('Academies retrieved successfully.', academies=[serialize_academy(request, academy) for academy in academies])


@csrf_exempt
@require_http_methods(['POST'])
def update_academy_payment_status(request, academy_id):
	academy = Academy.objects.select_related('director').filter(pk=academy_id).first()
	if not academy:
		return json_error('Academy not found.', status=404)
  
	data = get_request_data(request)
	paid = str(data.get('paid', 'true')).lower() in {'true', '1', 'yes', 'on'}
	academy.paid = paid
	academy.save(update_fields=['paid'])
	if paid:
		from users.utils import log_decision, create_user_notification
		log_decision(
			request, 'academy', academy.id, 'Approved',
			f"{academy.name} (APP-ACA-{academy.id:05d})",
			f"Academy ID ACA-2026-{academy.id:05d} issued",
			data.get('notes', '')
		)
		
		# Notify academy director
		if academy.director:
			create_user_notification(
				academy.director,
				"Academy Registration Approved",
				f"Registration for academy '{academy.name}' has been approved."
			)
	return json_success('Academy payment status updated successfully.', academy=serialize_academy(request, academy))

