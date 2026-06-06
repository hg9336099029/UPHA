# pyrefly: ignore [missing-import]
from django.contrib.auth import authenticate, login, logout
# pyrefly: ignore [missing-import]
from django.db import transaction
# pyrefly: ignore [missing-import]
from django.views.decorators.csrf import csrf_exempt
# pyrefly: ignore [missing-import]
from django.views.decorators.http import require_http_methods
# pyrefly: ignore [missing-import]
from django.db.models import Q

from .models import Coach, Player, Referee, User
from .utils import admin_required_response, get_request_data, json_error, json_success, serialize_coach, serialize_player, serialize_referee, serialize_user


def _create_user_account(request, data, role, is_staff=False):
	email = data.get('email')
	password = data.get('password')
	name = data.get('name', '').strip()

	if not email or not password or not name:
		return None, json_error('Full Name, Email, and Password are required fields. Please fill them in and try again.')

	if User.objects.filter(email=email).exists():
		return None, json_error(
			f'The email address "{email}" is already registered. '
			'Each person can only have one account. '
			'Please use a different email address, or log in if you have already registered.'
		)

	adhar_number = data.get('adhar_number')
	if adhar_number and User.objects.filter(adhar_number=adhar_number).exists():
		return None, json_error(
			f'The Aadhar number "{adhar_number}" is already linked to an existing account. '
			'Each person can only register once. '
			'If you believe this is a mistake, please contact UPHA support.'
		)

	files = request.FILES
	user = User.objects.create_user(
		email=email,
		password=password,
		username=data.get('username') or None,
		name=name,
		father_name=data.get('father_name', ''),
		mother_name=data.get('mother_name', ''),
		gender=data.get('gender', ''),
		blood_group=data.get('blood_group', ''),
		date_of_birth=data.get('date_of_birth') or None,
		phone_number=data.get('phone_number', ''),
		adhar_number=data.get('adhar_number') or None,
		adhar_image=files.get('adhar_image'),
		passport_image=files.get('passport_image'),
		role=role,
		is_staff=is_staff,
	)
	return user, None


def _parse_paid_flag(data):
	return str(data.get('paid', '')).lower() in {'true', '1', 'yes', 'on'}


@csrf_exempt
@require_http_methods(['POST'])
def register_admin(request):
	data = get_request_data(request)

	if User.objects.filter(role='admin').exists():
		admin_response = admin_required_response(request)
		if admin_response:
			return admin_response

	try:
		with transaction.atomic():
			user, error_response = _create_user_account(request, data, 'admin', is_staff=True)
			if error_response:
				return error_response
	except Exception as exc:
		return json_error(str(exc))

	return json_success('Admin registered successfully.', user=serialize_user(request, user))


@csrf_exempt
@require_http_methods(['POST'])
def register_player(request):
	data = get_request_data(request)

	try:
		with transaction.atomic():
			user, error_response = _create_user_account(request, data, 'player')
			if error_response:
				return error_response

			transaction_id = data.get('transaction_id', '')
			if transaction_id and Player.objects.filter(transaction_id=transaction_id).exists():
				return json_error(
					f'The UPI Transaction ID "{transaction_id}" has already been used in another registration. '
					'Please check your payment details — each transaction ID can only be used once. '
					'If you made a new payment, please enter the correct transaction ID from that payment.'
				)

			player = Player.objects.create(
				user=user,
				district=data.get('district', ''),
				dominant_hand=data.get('dominant_hand', 'right'),
				club_name=data.get('club_name', ''),
				school_name=data.get('school_name', ''),
				coach_name=data.get('coach_name', ''),
				height=float(data.get('height') or 0),
				weight=float(data.get('weight') or 0),
				transaction_id=data.get('transaction_id', ''),
				transaction_image=request.FILES.get('transaction_image'),
				paid=str(data.get('paid', '')).lower() in {'true', '1', 'yes'},
			)
	except Exception as exc:
		return json_error(str(exc))

	return json_success('Player registered successfully.', player=serialize_player(request, player))


@csrf_exempt
@require_http_methods(['POST'])
def register_coach(request):
	data = get_request_data(request)

	try:
		with transaction.atomic():
			user, error_response = _create_user_account(request, data, 'coach')
			if error_response:
				return error_response

			transaction_id = data.get('transaction_id', '')
			if transaction_id and Coach.objects.filter(transaction_id=transaction_id).exists():
				return json_error(
					f'The UPI Transaction ID "{transaction_id}" has already been used in another registration. '
					'Please check your payment details — each transaction ID can only be used once. '
					'If you made a new payment, please enter the correct transaction ID from that payment.'
				)

			coach = Coach.objects.create(
				user=user,
				district=data.get('district', ''),
				occupation=data.get('occupation', 'self_employed'),
				highest_coaching_grade=data.get('highest_coaching_grade', ''),
				transaction_id=data.get('transaction_id', ''),
				transaction_image=request.FILES.get('transaction_image'),
				paid=str(data.get('paid', '')).lower() in {'true', '1', 'yes'},
			)
	except Exception as exc:
		return json_error(str(exc))

	return json_success('Coach registered successfully.', coach=serialize_coach(request, coach))


@csrf_exempt
@require_http_methods(['POST'])
def register_referee(request):
	data = get_request_data(request)

	try:
		with transaction.atomic():
			user, error_response = _create_user_account(request, data, 'referee')
			if error_response:
				return error_response

			transaction_id = data.get('transaction_id', '')
			if transaction_id and Referee.objects.filter(transaction_id=transaction_id).exists():
				return json_error(
					f'The UPI Transaction ID "{transaction_id}" has already been used in another registration. '
					'Please check your payment details — each transaction ID can only be used once. '
					'If you made a new payment, please enter the correct transaction ID from that payment.'
				)

			previous_referee_id = data.get('previous_referee_id', '')
			if previous_referee_id and Referee.objects.filter(previous_referee_id=previous_referee_id).exists():
				return json_error(
					f'The Previous Referee ID "{previous_referee_id}" is already linked to another application. '
					'If you are renewing your accreditation, please contact UPHA to avoid duplicate entries.'
				)

			referee = Referee.objects.create(
				user=user,
				district=data.get('district', ''),
				occupation=data.get('occupation', 'self_employed'),
				grade_applying_for=data.get('grade_applying_for', ''),
				year_of_officiating_experience=int(data.get('year_of_officiating_experience') or 0),
				highest_level_officiated=data.get('highest_level_officiated', ''),
				tournament_officiated=data.get('tournament_officiated', ''),
				previous_referee_id=data.get('previous_referee_id', ''),
				transaction_id=data.get('transaction_id', ''),
				transaction_image=request.FILES.get('transaction_image'),
				paid=_parse_paid_flag(data),
			)
	except Exception as exc:
		return json_error(str(exc))

	return json_success('Referee registered successfully.', referee=serialize_referee(request, referee))



@csrf_exempt
@require_http_methods(['POST'])
def login_view(request):
	data = get_request_data(request)
	email = data.get('email')
	password = data.get('password')

	if not email or not password:
		return json_error('email and password are required.')

	user = authenticate(request, email=email, password=password)
	if user is None:
		return json_error('Invalid login credentials.', status=401)

	login(request, user)
	return json_success('Login successful.', user={
		'id': user.id,
		'email': user.email,
		'name': user.name,
		'role': user.role,
	})


@csrf_exempt
@require_http_methods(['POST'])
def logout_view(request):
	logout(request)
	return json_success('Logout successful.')


@require_http_methods(['GET'])
def list_players(request):
	players = Player.objects.select_related('user').all().order_by('id')
	return json_success('Players retrieved successfully.', players=[serialize_player(request, player) for player in players])


@require_http_methods(['GET'])
def list_coaches(request):
	coaches = Coach.objects.select_related('user').all().order_by('id')
	return json_success('Coaches retrieved successfully.', coaches=[serialize_coach(request, coach) for coach in coaches])


@require_http_methods(['GET'])
def list_referees(request):
	referees = Referee.objects.select_related('user').all().order_by('id')
	return json_success('Referees retrieved successfully.', referees=[serialize_referee(request, referee) for referee in referees])

@require_http_methods(['GET'])
def search_players(request):
	email_query = request.GET.get('email', '').strip()
	adhar_query = request.GET.get('adhar_number', '').strip()
	phone_query = request.GET.get('phone_number', '').strip()
	filter = Q()
	if email_query:
		filter |= Q(user__email__icontains=email_query)
	if adhar_query:
		filter |= Q(user__adhar_number__icontains=adhar_query)
	if phone_query:
		filter |= Q(user__phone_number__icontains=phone_query)
	if not filter:
		return json_error('At least one search criteria is required.')

	players = Player.objects.select_related('user').filter(filter).order_by('id')
	if not players.exists():
		return json_error('No players found matching the search criteria.', status=404)
	return json_success('Players retrieved successfully.', players=[serialize_player(request, player) for player in players])


@require_http_methods(['GET'])
def me_view(request):
	user = getattr(request, 'user', None)
	if not user or not user.is_authenticated:
		return json_error('Authentication required.', status=401)

	if user.role == 'player':
		player = Player.objects.select_related('user').filter(user=user).first()
		if not player:
			return json_error('Player profile not found.', status=404)
		return json_success('Current player profile retrieved successfully.', user=serialize_player(request, player))

	if user.role == 'coach':
		coach = Coach.objects.select_related('user').filter(user=user).first()
		if not coach:
			return json_error('Coach profile not found.', status=404)
		return json_success('Current coach profile retrieved successfully.', user=serialize_coach(request, coach))

	if user.role == 'referee':
		referee = Referee.objects.select_related('user').filter(user=user).first()
		if not referee:
			return json_error('Referee profile not found.', status=404)
		return json_success('Current referee profile retrieved successfully.', user=serialize_referee(request, referee))

	return json_error('Only coach, referee, and player accounts can access this endpoint.', status=403)


@csrf_exempt
@require_http_methods(['POST'])
def update_player_payment_status(request, player_id):
	player = Player.objects.select_related('user').filter(pk=player_id).first()
	if not player:
		return json_error('Player not found.', status=404)

	data = get_request_data(request)
	paid = _parse_paid_flag(data)
	player.paid = paid
	player.save(update_fields=['paid'])
	return json_success('Player payment status updated successfully.', player=serialize_player(request, player))


@csrf_exempt
@require_http_methods(['POST'])
def update_coach_payment_status(request, coach_id):
	coach = Coach.objects.select_related('user').filter(pk=coach_id).first()
	if not coach:
		return json_error('Coach not found.', status=404)

	data = get_request_data(request)
	paid = _parse_paid_flag(data)
	coach.paid = paid
	coach.save(update_fields=['paid'])
	return json_success('Coach payment status updated successfully.', coach=serialize_coach(request, coach))


@csrf_exempt
@require_http_methods(['POST'])
def update_referee_payment_status(request, referee_id):
	referee = Referee.objects.select_related('user').filter(pk=referee_id).first()
	if not referee:
		return json_error('Referee not found.', status=404)

	data = get_request_data(request)
	paid = _parse_paid_flag(data)
	referee.paid = paid
	referee.save(update_fields=['paid'])
	return json_success('Referee payment status updated successfully.', referee=serialize_referee(request, referee))


@csrf_exempt
@require_http_methods(['POST'])
def upload_player_certificate(request, player_id):
	player = Player.objects.select_related('user').filter(pk=player_id).first()
	if not player:
		return json_error('Player not found.', status=404)

	certificate_image = request.FILES.get('certificate_image')
	if not certificate_image:
		return json_error('certificate_image is required.')

	player.certificate_image = certificate_image
	player.save(update_fields=['certificate_image'])
	return json_success('Player certificate uploaded successfully.', player=serialize_player(request, player))


@require_http_methods(['GET'])
def get_my_certificate(request):
	user = getattr(request, 'user', None)
	if not user or not user.is_authenticated:
		return json_error('Authentication required.', status=401)
	if user.role != 'player':
		return json_error('Only player accounts can access this endpoint.', status=403)

	player = Player.objects.select_related('user').filter(user=user).first()
	if not player:
		return json_error('Player profile not found.', status=404)
	if not player.certificate_image:
		return json_error('Certificate not uploaded yet.', status=404)

	return json_success(
		'Player certificate retrieved successfully.',
		certificate={
			'player_id': player.id,
			'certificate_image': request.build_absolute_uri(player.certificate_image.url),
		},
	)
