from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .models import Academy
from users.utils import get_request_data, json_error, json_success, serialize_academy


@csrf_exempt
@require_http_methods(['POST'])
def register_academy(request):
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
		academy = Academy.objects.create(
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

	return json_success('Academy registered successfully.', academy=serialize_academy(request, academy))


@require_http_methods(['GET'])
def list_academies(request):
	academies = Academy.objects.select_related('adhyaksha', 'sachiv', 'koshadhyaksha').all().order_by('id')
	return json_success('Academies retrieved successfully.', academies=[serialize_academy(request, academy) for academy in academies])


@csrf_exempt
@require_http_methods(['POST'])
def update_academy_payment_status(request, academy_id):
	academy = Academy.objects.select_related('adhyaksha', 'sachiv', 'koshadhyaksha').filter(pk=academy_id).first()
	if not academy:
		return json_error('Academy not found.', status=404)

	data = get_request_data(request)
	paid = str(data.get('paid', 'true')).lower() in {'true', '1', 'yes', 'on'}
	academy.paid = paid
	academy.save(update_fields=['paid'])
	return json_success('Academy payment status updated successfully.', academy=serialize_academy(request, academy))
