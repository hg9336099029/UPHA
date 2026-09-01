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

from .models import Coach, Player, Referee, User, SystemSettings, AGMLetter
from .utils import admin_required_response, get_request_data, image_url, json_error, json_success, serialize_coach, serialize_player, serialize_referee, serialize_user, notify_admins, serialize_system_settings


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
			
			from users.utils import create_admin_notification
			create_admin_notification(
				"New Player Application",
				f"{user.name} has registered as a Player and is awaiting approval."
			)
	except Exception as exc:
		return json_error(str(exc))

	notify_admins('New Player Application', f'{user.name} has submitted a new player application from {player.district}.')

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

	notify_admins('New Coach Application', f'{user.name} has submitted a new coach application from {coach.district}.')

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

	notify_admins('New Referee Application', f'{user.name} has submitted a new referee application from {referee.district}.')

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

	if user.role == 'academy':
		from academy.models import Academy
		academy = Academy.objects.select_related('user', 'director').prefetch_related('facility_photos').filter(user=user).first()
		if not academy:
			return json_error('Academy profile not found.', status=404)
		from users.utils import serialize_academy
		return json_success('Current academy profile retrieved successfully.', user=serialize_academy(request, academy))

	if user.role == 'district':
		from district.models import District
		district = District.objects.select_related('user', 'adhyaksha', 'sachiv', 'koshadhyaksha').filter(user=user).first()
		if not district:
			return json_error('District profile not found.', status=404)
		from users.utils import serialize_district
		return json_success('Current district profile retrieved successfully.', user=serialize_district(request, district))

	if user.role == 'admin':
		return json_success('Current admin profile retrieved successfully.', user={'id': user.id, 'email': user.email, 'name': user.name, 'role': 'admin'})

	return json_error('Only coach, referee, academy, district, admin, and player accounts can access this endpoint.', status=403)


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
	if paid:
		from django.utils import timezone
		from datetime import timedelta
		player.user.valid_through = timezone.now() + timedelta(days=365)
		player.user.save(update_fields=['valid_through'])
		from users.utils import log_decision
		log_decision(
			request, 'player', player.id, 'Approved',
			f"{player.user.name} (APP-PLR-{player.id:05d})",
			f"Player ID PLR-2026-{player.id:05d} issued",
			data.get('notes', '')
		)
		from users.utils import create_user_notification
		create_user_notification(
			player.user,
			"Registration Approved",
			"Your registration has been approved. You are now officially registered as a Player."
		)
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
	if paid:
		from django.utils import timezone
		from datetime import timedelta
		coach.user.valid_through = timezone.now() + timedelta(days=365)
		coach.user.save(update_fields=['valid_through'])
		from users.utils import log_decision
		log_decision(
			request, 'coach', coach.id, 'Approved',
			f"{coach.user.name} (APP-CCH-{coach.id:05d})",
			f"Coach ID CCH-2026-{coach.id:05d} issued",
			data.get('notes', '')
		)
		from users.utils import create_user_notification
		create_user_notification(
			coach.user,
			"Registration Approved",
			"Your registration has been approved. You are now officially registered as a Coach."
		)
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
	if paid:
		from django.utils import timezone
		from datetime import timedelta
		referee.user.valid_through = timezone.now() + timedelta(days=365)
		referee.user.save(update_fields=['valid_through'])
		from users.utils import log_decision
		log_decision(
			request, 'referee', referee.id, 'Approved',
			f"{referee.user.name} (APP-REF-{referee.id:05d})",
			f"Referee ID REF-2026-{referee.id:05d} issued",
			data.get('notes', '')
		)
		from users.utils import create_user_notification
		create_user_notification(
			referee.user,
			"Registration Approved",
			"Your registration has been approved. You are now officially registered as a Referee."
		)
	return json_success('Referee payment status updated successfully.', referee=serialize_referee(request, referee))

@csrf_exempt
@require_http_methods(['POST'])
def reject_application(request):
	data = get_request_data(request)
	app_type = data.get('type')
	app_id = data.get('id')
	notes = data.get('notes', 'Application rejected')
	
	if not app_type or not app_id:
		return json_error('Type and ID are required.')

	from users.utils import log_decision
	name_ref = ""
	
	if app_type == 'player':
		obj = Player.objects.select_related('user').filter(pk=app_id).first()
		if not obj: return json_error('Not found', status=404)
		name_ref = f"{obj.user.name} (APP-PLR-{obj.id:05d})"
	elif app_type == 'coach':
		obj = Coach.objects.select_related('user').filter(pk=app_id).first()
		if not obj: return json_error('Not found', status=404)
		name_ref = f"{obj.user.name} (APP-CCH-{obj.id:05d})"
	elif app_type == 'referee':
		obj = Referee.objects.select_related('user').filter(pk=app_id).first()
		if not obj: return json_error('Not found', status=404)
		name_ref = f"{obj.user.name} (APP-REF-{obj.id:05d})"
	elif app_type == 'academy':
		from academy.models import Academy
		obj = Academy.objects.filter(pk=app_id).first()
		if not obj: return json_error('Not found', status=404)
		name_ref = f"{obj.name} (APP-ACA-{obj.id:05d})"
	else:
		return json_error('Invalid application type.')
		
	log_decision(
		request, app_type, app_id, 'Rejected',
		name_ref,
		notes,
		notes
	)
	return json_success('Application rejected successfully.')


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
			'certificate_image': image_url(request, player.certificate_image),
		},
	)

@require_http_methods(['GET'])
def get_admin_stats(request):
	from django.utils import timezone
	from datetime import timedelta
	from users.models import DecisionLog, Player, Coach, Referee, User
	from academy.models import Academy
	from events.models import Event, EventResults
	from gallery.models import Gallery

	now = timezone.now()
	today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
	week_start = today_start - timedelta(days=today_start.weekday())
	month_start = today_start.replace(day=1)

	approved_today = DecisionLog.objects.filter(action='Approved', created_at__gte=today_start).count()
	approved_this_week = DecisionLog.objects.filter(action='Approved', created_at__gte=week_start).count()
	rejected_this_month = DecisionLog.objects.filter(action='Rejected', created_at__gte=month_start).count()

	from district.models import District
	pending_p = Player.objects.filter(paid=False).count()
	pending_c = Coach.objects.filter(paid=False).count()
	pending_r = Referee.objects.filter(paid=False).count()
	pending_a = Academy.objects.filter(paid=False).count()
	pending_d = District.objects.filter(paid=False).count()
	total_pending = pending_p + pending_c + pending_r + pending_a + pending_d

	active_events = Event.objects.count()
	draft_events = 0
	
	# Events in the past with no results
	events_with_results = EventResults.objects.values_list('event_id', flat=True).distinct()
	results_awaiting = Event.objects.exclude(id__in=events_with_results).filter(end_date__lt=now.date()).count()

	gallery_albums = Gallery.objects.filter(content_type='photo').count()
	
	active_admins = User.objects.filter(role='admin').count()

	return json_success('Stats retrieved successfully.', stats={
		'approved_today': approved_today,
		'approved_this_week': approved_this_week,
		'rejected_this_month': rejected_this_month,
		'total_pending': total_pending,
		'pending_players': pending_p,
		'pending_coaches': pending_c,
		'pending_referees': pending_r,
		'pending_academies': pending_a,
		'pending_districts': pending_d,
		'active_events': active_events,
		'draft_events': draft_events,
		'results_awaiting': results_awaiting,
		'gallery_albums': gallery_albums,
		'active_admins': active_admins,
		'scheduled_notices': 0,
	})

@require_http_methods(['GET'])
def get_recent_decisions(request):
	from users.models import DecisionLog
	decisions = DecisionLog.objects.select_related('admin').order_by('-created_at')[:20]
	data = []
	for d in decisions:
		data.append({
			'id': d.id,
			'applicant_type': d.applicant_type,
			'applicant_id': d.applicant_id,
			'action': d.action,
			'applicant_name_ref': d.applicant_name_ref,
			'details': d.details,
			'admin_name': d.admin.name if d.admin else 'System',
			'notes': d.notes,
			'created_at': d.created_at.isoformat(),
		})
	return json_success('Decisions retrieved successfully.', decisions=data)

@csrf_exempt
@require_http_methods(['POST'])
def invite_admin(request):
	# In a real setup, we would check request.user.is_staff
	# For now, since auth works with JWT/Session we will just create the user.
	# The frontend guards this by only showing the dashboard to admins.
	data = get_request_data(request)
	email = data.get('email', '').strip()
	name = data.get('name', '').strip()

	password = data.get('password', '').strip()

	if not email or not name:
		return json_error('Email and name are required.')

	if User.objects.filter(email=email).exists():
		return json_error('A user with this email already exists.')

	import string
	import random
	if password:
		temp_password = password
	else:
		chars = string.ascii_letters + string.digits + "!@#$%"
		temp_password = ''.join(random.choice(chars) for _ in range(12))

	try:
		with transaction.atomic():
			user = User.objects.create_admin(
				email=email,
				password=temp_password,
				name=name
			)
			# Optionally log this action
			from users.utils import log_decision
			# log_decision(request, 'admin', user.id, 'Created Admin', f"{user.name} ({user.email})", 'Created via Invite', '')
	except Exception as exc:
		return json_error(str(exc))

	return json_success('Admin created successfully.', credentials={
		'email': email,
		'password': temp_password,
		'name': name
	})


@csrf_exempt
@require_http_methods(['POST'])
def update_credentials(request):
	user = getattr(request, 'user', None)
	if not user or not user.is_authenticated:
		return json_error('Authentication required.', status=401)
		
	data = get_request_data(request)
	current_password = data.get('current_password', '')
	new_password = data.get('new_password', '')
	new_email = data.get('new_email', '').strip()
	
	if not current_password:
		return json_error('Current password is required to make changes.')
		
	if not user.check_password(current_password):
		return json_error('Incorrect current password.')
		
	updated = False
	
	if new_password:
		user.set_password(new_password)
		updated = True
		
	if new_email and new_email != user.email:
		from users.models import User
		if User.objects.filter(email=new_email).exclude(id=user.id).exists():
			return json_error('This email is already in use by another account.')
		user.email = new_email
		updated = True
		
	if updated:
		user.save()
		from django.contrib.auth import login
		login(request, user)
		return json_success('Settings updated successfully.')
	else:
		return json_error('No changes were provided.')

@require_http_methods(['GET'])
def get_notifications(request):
	user = getattr(request, 'user', None)
	if not user or not user.is_authenticated:
		return json_error('Authentication required.', status=401)
	
	from users.models import Notification
	notifs = Notification.objects.filter(user=user).order_by('-created_at')[:50]
	data = []
	for n in notifs:
		data.append({
			'id': n.id,
			'title': n.title,
			'message': n.message,
			'is_read': n.is_read,
			'created_at': n.created_at.isoformat(),
		})
	return json_success('Notifications retrieved successfully.', notifications=data)

@csrf_exempt
@require_http_methods(['POST'])
def mark_notification_read(request, notif_id):
	user = getattr(request, 'user', None)
	if not user or not user.is_authenticated:
		return json_error('Authentication required.', status=401)
	
	from users.models import Notification
	notif = Notification.objects.filter(pk=notif_id, user=user).first()
	if not notif:
		return json_error('Notification not found.', status=404)
	
	notif.delete()
	return json_success('Notification marked as read and removed.')

@require_http_methods(['GET'])
def list_office_bearers(request):
	try:
		from users.models import OfficeBearer
		bearers = OfficeBearer.objects.all().order_by('order')
		bearer_list = []
		for b in bearers:
			bearer_list.append({
				'id': b.id,
				'name': b.name,
				'role': b.role,
				'image': image_url(request, b.image) if b.image else None,
				'order': b.order,
				'term': b.term
			})
		return json_success('Office bearers retrieved successfully.', office_bearers=bearer_list)
	except Exception as e:
		return json_error(str(e), status=400)

@require_http_methods(["GET"])
def get_global_stats(request):
	try:
		from district.models import District
		from users.models import Player, Coach, Referee
		from events.models import Event
		from academy.models import Academy
		
		stats = {
			'districts': District.objects.filter(paid=True).count(),
			'players': Player.objects.filter(paid=True).count(),
			'coaches': Coach.objects.filter(paid=True).count(),
			'referees': Referee.objects.filter(paid=True).count(),
			'academies': Academy.objects.filter(paid=True).count(),
			'tournaments': Event.objects.filter(category='TOURNAMENT').count()
		}
		return json_success('Stats retrieved successfully', stats=stats)
	except Exception as e:
		return json_error(str(e), status=400)

@require_http_methods(['GET'])
def get_my_certificates(request):
	user = getattr(request, 'user', None)
	if not user or not user.is_authenticated:
		return json_error('Authentication required.', status=401)
	
	from users.models import Certificate
	certificates = Certificate.objects.filter(user=user).order_by('-created_at')
	data = []
	for c in certificates:
		data.append({
			'id': c.id,
			'title': c.title,
			'status': c.status,
			'details': c.details,
			'certificate_id': c.certificate_id,
			'icon_type': c.icon_type,
			'created_at': c.created_at.isoformat(),
		})
	return json_success('Certificates retrieved successfully.', certificates=data)

@require_http_methods(['GET'])
def get_my_assignments(request):
	user = getattr(request, 'user', None)
	if not user or not user.is_authenticated:
		return json_error('Authentication required.', status=401)
	
	if user.role != 'referee':
		return json_error('Only referee accounts can access this endpoint.', status=403)
	
	from users.models import Referee
	from events.models import EventAssignment
	referee = Referee.objects.filter(user=user).first()
	if not referee:
		return json_error('Referee profile not found.', status=404)
	
	assignments = EventAssignment.objects.filter(referee=referee).select_related('event').order_by('event__start_date')
	data = []
	for a in assignments:
		data.append({
			'id': a.id,
			'event': {
				'id': a.event.id,
				'name': a.event.name,
				'location': a.event.location,
				'start_date': a.event.start_date.isoformat(),
				'end_date': a.event.end_date.isoformat(),
				'category': a.event.category,
			},
			'status': a.status,
			'role': a.role,
			'created_at': a.created_at.isoformat(),
		})
	return json_success('Assignments retrieved successfully.', assignments=data)


@require_http_methods(['GET'])
def get_announcements(request):
	from users.models import Announcement
	announcements = Announcement.objects.all().order_by('-created_at')[:20]
	data = []
	for a in announcements:
		data.append({
			'id': a.id,
			'title': a.title,
			'message': a.message,
			'created_at': a.created_at.isoformat(),
		})
	return json_success('Announcements retrieved successfully.', announcements=data)


@csrf_exempt
@require_http_methods(['POST'])
def create_announcement(request):
	admin_response = admin_required_response(request)
	if admin_response:
		return admin_response

	data = get_request_data(request)
	title = (data.get('title') or '').strip()
	message = (data.get('message') or '').strip()

	if not title or not message:
		return json_error('title and message are required.')

	from users.models import Announcement
	announcement = Announcement.objects.create(
		title=title,
		message=message,
		created_by=request.user if request.user.is_authenticated else None,
	)
	return json_success('Announcement published successfully.', announcement={
		'id': announcement.id,
		'title': announcement.title,
		'message': announcement.message,
		'created_at': announcement.created_at.isoformat(),
	})


@csrf_exempt
@require_http_methods(['POST', 'DELETE'])
def manage_office_bearers(request):
	admin_response = admin_required_response(request)
	if admin_response:
		return admin_response

	try:
		from users.models import OfficeBearer
		
		if request.method == 'POST':
			bearer_id = request.POST.get('id')
			name = request.POST.get('name')
			role = request.POST.get('role')
			order = request.POST.get('order', 0)
			term = request.POST.get('term', '2023 - 2027')
			image = request.FILES.get('image')
			
			if not name or not role:
				return json_error('Name and Role are required.')
				
			if bearer_id:
				# Update
				bearer = OfficeBearer.objects.get(id=bearer_id)
				bearer.name = name
				bearer.role = role
				bearer.order = int(order)
				bearer.term = term
				if image:
					bearer.image = image
				bearer.save()
				return json_success('Office bearer updated successfully.')
			else:
				# Create
				bearer = OfficeBearer.objects.create(
					name=name,
					role=role,
					order=int(order),
					term=term,
					image=image
				)
				return json_success('Office bearer added successfully.', bearer={
					'id': bearer.id,
					'name': bearer.name,
					'role': bearer.role,
					'order': bearer.order,
					'term': bearer.term,
					'image': image_url(request, bearer.image) if bearer.image else None
				})

		elif request.method == 'DELETE':
			import json
			try:
				data = json.loads(request.body)
				bearer_id = data.get('id')
			except:
				bearer_id = request.GET.get('id')
				
			if not bearer_id:
				return json_error('Office bearer ID is required for deletion.')
				
			bearer = OfficeBearer.objects.get(id=bearer_id)
			if bearer.image:
				bearer.image.delete()
			bearer.delete()
			return json_success('Office bearer deleted successfully.')
			
	except Exception as exc:
		return json_error(str(exc))

@require_http_methods(['GET'])
def get_referee_stats(request):
	try:
		from users.models import Referee
		
		total_referees = Referee.objects.count()
		districts_represented = Referee.objects.values('district').distinct().count()
		
		return json_success('Stats retrieved successfully', **{
			'total_referees': total_referees,
			'districts_represented': districts_represented,
			'board_count': 0,
			'board_members': []
		})
	except Exception as e:
		return json_error(str(e), status=400)

@require_http_methods(['GET'])
def get_district_stats(request):
	try:
		from district.models import District
		total_districts = District.objects.count()
		
		return json_success('Stats retrieved successfully', **{
			'total_districts': total_districts,
			'affiliated': total_districts,
			'open': 0
		})
	except Exception as e:
		return json_error(str(e), status=400)


@require_http_methods(['GET'])
def get_my_academy_players(request):
	"""Return players belonging to the logged-in academy (matched by club_name)."""
	user = getattr(request, 'user', None)
	if not user or not user.is_authenticated:
		return json_error('Authentication required.', status=401)
	if user.role != 'academy':
		return json_error('Only academy accounts can access this endpoint.', status=403)

	from academy.models import Academy
	academy = Academy.objects.filter(user=user).first()
	if not academy:
		return json_error('Academy profile not found.', status=404)

	players = Player.objects.select_related('user').filter(
		club_name__iexact=academy.name
	).order_by('id')
	return json_success(
		'Academy players retrieved successfully.',
		players=[serialize_player(request, p) for p in players]
	)

@csrf_exempt
@require_http_methods(['GET'])
def get_system_settings(request):
	try:
		from users.models import SystemSettings
		from users.utils import serialize_system_settings
		settings = SystemSettings.load()
		return json_success('Settings retrieved', settings=serialize_system_settings(request, settings))
	except Exception as e:
		return json_error(str(e))

@csrf_exempt
@require_http_methods(['POST'])
def update_system_settings(request):
	user = getattr(request, 'user', None)
	if not user or not user.is_authenticated or user.role != 'admin':
		return json_error('Only admins can update settings.', status=403)
		
	try:
		from users.models import SystemSettings
		from users.utils import serialize_system_settings
		settings = SystemSettings.load()
		
		# Update fields
		if 'player_fee' in request.POST:
			settings.player_fee = int(request.POST['player_fee'])
		if 'coach_fee' in request.POST:
			settings.coach_fee = int(request.POST['coach_fee'])
		if 'referee_fee' in request.POST:
			settings.referee_fee = int(request.POST['referee_fee'])
		if 'academy_fee' in request.POST:
			settings.academy_fee = int(request.POST['academy_fee'])
		if 'district_fee' in request.POST:
			settings.district_fee = int(request.POST['district_fee'])
		if 'facebook_link' in request.POST:
			settings.facebook_link = request.POST['facebook_link']
		if 'twitter_link' in request.POST:
			settings.twitter_link = request.POST['twitter_link']
		if 'instagram_link' in request.POST:
			settings.instagram_link = request.POST['instagram_link']
		if 'youtube_link' in request.POST:
			settings.youtube_link = request.POST['youtube_link']
		if 'contact_email' in request.POST:
			settings.contact_email = request.POST['contact_email']
		if 'contact_mobile' in request.POST:
			settings.contact_mobile = request.POST['contact_mobile']
		if 'contact_address' in request.POST:
			settings.contact_address = request.POST['contact_address']
			
		# Handle QR code upload
		if 'payment_qr_code' in request.FILES:
			if settings.payment_qr_code:
				settings.payment_qr_code.delete(save=False)
			settings.payment_qr_code = request.FILES['payment_qr_code']
			
		# Handle Affiliation Letters
		if 'hai_affiliation_letter' in request.FILES:
			if settings.hai_affiliation_letter:
				settings.hai_affiliation_letter.delete(save=False)
			settings.hai_affiliation_letter = request.FILES['hai_affiliation_letter']
			
		if 'up_olympic_letter' in request.FILES:
			if settings.up_olympic_letter:
				settings.up_olympic_letter.delete(save=False)
			settings.up_olympic_letter = request.FILES['up_olympic_letter']
			
		settings.save()
		return json_success('Settings updated successfully', settings=serialize_system_settings(request, settings))
	except Exception as e:
		return json_error(str(e))

@csrf_exempt
@require_http_methods(['POST'])
def submit_renewal(request):
	user = getattr(request, 'user', None)
	if not user or not user.is_authenticated:
		return json_error('Authentication required.', status=401)
	
	transaction_id = request.POST.get('transaction_id')
	transaction_image = request.FILES.get('transaction_image')

	if not transaction_id:
		return json_error('Transaction ID is required.')

	from users.models import RenewalRequest
	try:
		RenewalRequest.objects.create(
			user=user,
			transaction_id=transaction_id,
			transaction_image=transaction_image
		)
		
		# Set user's role profile to not paid
		if user.role == 'player':
			profile = Player.objects.filter(user=user).first()
			if profile:
				profile.paid = False
				profile.save(update_fields=['paid'])
		elif user.role == 'coach':
			profile = Coach.objects.filter(user=user).first()
			if profile:
				profile.paid = False
				profile.save(update_fields=['paid'])
		elif user.role == 'referee':
			profile = Referee.objects.filter(user=user).first()
			if profile:
				profile.paid = False
				profile.save(update_fields=['paid'])
		elif user.role == 'academy':
			from academy.models import Academy
			profile = Academy.objects.filter(director=user).first()
			if profile:
				profile.paid = False
				profile.save(update_fields=['paid'])
		elif user.role == 'district':
			from district.models import District
			profile = District.objects.filter(adhyaksha=user).first()
			if profile:
				profile.paid = False
				profile.save(update_fields=['paid'])

		from users.utils import notify_admins
		notify_admins(
			"Renewal Request",
			f"{user.name} ({user.role.title()}) has submitted a renewal request."
		)
		
		return json_success('Renewal request submitted successfully. Pending admin approval.')
	except Exception as e:
		return json_error(str(e))


@require_http_methods(['GET'])
def get_event_participants_for_certificates(request):
	"""Admin: list all events with already-issued certs. No EventResults dependency."""
	admin_response = admin_required_response(request)
	if admin_response:
		return admin_response

	from events.models import Event
	from users.models import Certificate

	events = Event.objects.all().order_by('-start_date', '-id')
	result = []

	for event in events:
		# Only look at certs whose certificate_id matches this event's pattern
		cert_prefix = f'CERT-PLR-'
		cert_suffix = f'-EV-{event.id}'
		issued_certs_qs = Certificate.objects.filter(
			certificate_id__startswith=cert_prefix,
			certificate_id__endswith=cert_suffix,
		).select_related('user')

		issued_certs = []
		for cert in issued_certs_qs:
			# Resolve player profile
			from users.models import Player
			player = Player.objects.filter(user=cert.user).first()
			issued_certs.append({
				'player_id': player.id if player else None,
				'player_name': cert.user.name,
				'district': player.district if player else '',
				'cert_type': cert.title,
				'cert_id': cert.certificate_id,
				'issued_at': cert.created_at.isoformat(),
			})

		result.append({
			'id': event.id,
			'name': event.name,
			'location': event.location,
			'start_date': str(event.start_date),
			'end_date': str(event.end_date),
			'category': event.category,
			'certs_issued': len(issued_certs),
			'issued_certs': issued_certs,
		})

	return json_success('Events retrieved successfully.', events=result)


@require_http_methods(['GET'])
def search_players_for_cert(request):
	"""Admin: search registered players by name or ID for certificate assignment."""
	admin_response = admin_required_response(request)
	if admin_response:
		return admin_response

	from users.models import Player
	from django.db.models import Q

	q = request.GET.get('q', '').strip()
	if not q:
		return json_error('Query parameter q is required.')

	# Search by name or numeric player ID
	filters = Q(user__name__icontains=q)
	if q.isdigit():
		filters |= Q(id=int(q))

	players = Player.objects.select_related('user').filter(filters).order_by('user__name')[:20]

	data = []
	for p in players:
		data.append({
			'id': p.id,
			'name': p.user.name,
			'district': p.district,
			'club_name': p.club_name,
			'player_id_str': f'PLR-{p.id:05d}',
		})

	return json_success('Players found.', players=data)


@csrf_exempt
@require_http_methods(['POST'])
def issue_event_certificates(request, event_id):
	"""Admin: issue certificates to specific players for a given event with chosen cert types."""
	admin_response = admin_required_response(request)
	if admin_response:
		return admin_response

	from events.models import Event
	from users.models import Certificate, Player

	event = Event.objects.filter(pk=event_id).first()
	if not event:
		return json_error('Event not found.', status=404)

	data = get_request_data(request)
	assignments = data.get('assignments', [])

	if not assignments:
		return json_error('assignments list is required.')

	VALID_CERT_TYPES = [
		'1st Position Certificate',
		'2nd Position Certificate',
		'3rd Position Certificate',
		'Runner-Up Certificate',
		'Participation Certificate',
	]

	issued = []
	skipped = []

	for assignment in assignments:
		player_id = assignment.get('player_id')
		cert_type = assignment.get('cert_type', 'Participation Certificate')

		if cert_type not in VALID_CERT_TYPES:
			cert_type = 'Participation Certificate'

		player = Player.objects.select_related('user').filter(pk=player_id).first()
		if not player:
			skipped.append({'player_id': player_id, 'reason': 'Player not found'})
			continue

		cert_id_key = f'CERT-PLR-{player.id}-EV-{event.id}'
		if Certificate.objects.filter(certificate_id=cert_id_key).exists():
			skipped.append({'player_id': player_id, 'player_name': player.user.name, 'reason': 'Already issued'})
			continue

		try:
			Certificate.objects.create(
				user=player.user,
				title=cert_type,
				status='Issued',
				details=f'Participated in {event.name} organized by UPHA',
				certificate_id=cert_id_key,
				icon_type='Award',
			)

			from users.utils import create_user_notification, log_decision
			create_user_notification(
				player.user,
				'Certificate Issued',
				f'Your {cert_type} for {event.name} has been issued. Download it from your dashboard.'
			)
			log_decision(
				request, 'player', player.id, 'Certificate Issued',
				f'{player.user.name} (PLR-{player.id:05d})',
				f'{cert_type} issued for event: {event.name}',
			)
			issued.append({'player_id': player.id, 'player_name': player.user.name, 'cert_type': cert_type})
		except Exception as exc:
			skipped.append({'player_id': player_id, 'reason': str(exc)})

	return json_success(
		f'{len(issued)} certificate(s) issued successfully.',
		issued_count=len(issued),
		skipped_count=len(skipped),
		issued=issued,
		skipped=skipped,
	)


@require_http_methods(['GET'])
def download_certificate(request, cert_id):
	user = getattr(request, 'user', None)
	if not user or not user.is_authenticated:
		from django.http import JsonResponse
		return JsonResponse({'success': False, 'message': 'Authentication required.'}, status=401)

	from users.models import Certificate
	certificate = Certificate.objects.filter(certificate_id=cert_id, user=user).first()
	if not certificate:
		from django.http import JsonResponse
		return JsonResponse({'success': False, 'message': 'Certificate not found or access denied.'}, status=404)

	from django.http import HttpResponse
	import io
	import os
	from django.conf import settings
	from reportlab.pdfgen import canvas
	from reportlab.lib.pagesizes import landscape, A4
	from reportlab.lib.units import inch

	buffer = io.BytesIO()
	p = canvas.Canvas(buffer, pagesize=landscape(A4))
	width, height = landscape(A4)

	# Fill background with cream color
	p.setFillColorRGB(0.99, 0.98, 0.96)
	p.rect(0, 0, width, height, fill=1)

	# Ornate outer border (Gold)
	p.setStrokeColorRGB(0.83, 0.68, 0.21) # #d4af37
	p.setLineWidth(6)
	p.rect(0.5*inch, 0.5*inch, width - 1*inch, height - 1*inch)
	
	# Ornate inner border (Gold double line)
	p.setLineWidth(1)
	p.rect(0.6*inch, 0.6*inch, width - 1.2*inch, height - 1.2*inch)
	p.rect(0.65*inch, 0.65*inch, width - 1.3*inch, height - 1.3*inch)

	# Federation Header
	p.setFillColorRGB(0.06, 0.09, 0.16) # Dark navy
	p.setFont("Helvetica-Bold", 14)
	p.drawCentredString(width/2.0, height - 1.2*inch, "UTTAR PRADESH HANDBALL ASSOCIATION")
	
	p.setStrokeColorRGB(0.83, 0.68, 0.21)
	p.line(width/2.0 - 2.5*inch, height - 1.35*inch, width/2.0 + 2.5*inch, height - 1.35*inch)

	# Certificate Title
	# Ribbon in Top Right
	p.saveState()
	p.translate(width - 1.5*inch, height - 1.5*inch)
	p.rotate(-45)
	p.setFillColorRGB(0.83, 0.68, 0.21)
	p.rect(-1.5*inch, -0.2*inch, 3*inch, 0.4*inch, fill=1, stroke=0)
	p.setFillColorRGB(1, 1, 1)
	p.setFont("Helvetica-Bold", 8)
	p.drawCentredString(0, -0.05*inch, "OFFICIAL")
	p.restoreState()

	# Logo Top Left
	logo_path = os.path.join(settings.BASE_DIR, '..', 'frontend', 'public', 'upha.png')
	if os.path.exists(logo_path):
		try:
			p.drawImage(logo_path, 1*inch, height - 2*inch, width=1*inch, height=1*inch, mask='auto')
		except Exception:
			pass

	# Small "CERTIFICATE OF"
	p.setFillColorRGB(0.6, 0.6, 0.6)
	p.setFont("Helvetica-Bold", 10)
	p.drawCentredString(width/2.0, height - 2.1*inch, "CERTIFICATE OF")

	p.setFillColorRGB(0.83, 0.68, 0.21)
	p.setFont("Times-BoldItalic", 36)
	p.drawCentredString(width/2.0, height - 2.6*inch, certificate.title)

	# Subtext
	p.setFillColorRGB(0.3, 0.3, 0.3)
	p.setFont("Times-Italic", 18)
	p.drawCentredString(width/2.0, height - 3.5*inch, "This is proudly presented to")

	# Recipient Name
	p.setFillColorRGB(0.06, 0.09, 0.16)
	p.setFont("Times-Bold", 32)
	p.drawCentredString(width/2.0, height - 4.5*inch, user.name.upper())

	p.setStrokeColorRGB(0.8, 0.8, 0.8)
	p.setLineWidth(1)
	p.line(width/2.0 - 3*inch, height - 4.65*inch, width/2.0 + 3*inch, height - 4.65*inch)

	# Details
	p.setFillColorRGB(0.2, 0.2, 0.2)
	p.setFont("Times-Roman", 16)
	p.drawCentredString(width/2.0, height - 5.5*inch, certificate.details)
	if certificate.status != 'issued':
		p.setFont("Helvetica", 12)
		p.drawCentredString(width/2.0, height - 6*inch, f"Status: {certificate.status}")



	# Footer IDs
	p.setFillColorRGB(0.5, 0.5, 0.5)
	p.setFont("Helvetica", 10)
	p.drawString(1*inch, 1*inch, f"Certificate ID: {certificate.certificate_id}")
	p.drawRightString(width - 1*inch, 1*inch, f"Issued Date: {certificate.created_at.strftime('%d %b %Y')}")

	p.showPage()
	p.save()

	buffer.seek(0)
	response = HttpResponse(buffer, content_type='application/pdf')
	response['Content-Disposition'] = f'attachment; filename="certificate_{certificate.certificate_id}.pdf"'
	return response



@require_http_methods(['GET'])
def download_id_card(request):
    user = getattr(request, 'user', None)
    if not user or not user.is_authenticated:
        from django.http import JsonResponse
        return JsonResponse({'success': False, 'message': 'Authentication required.'}, status=401)
    
    import io
    from django.http import HttpResponse
    from reportlab.pdfgen import canvas
    from reportlab.lib.pagesizes import landscape
    from reportlab.lib.units import inch
    import os
    from django.conf import settings

    width = 2.125 * inch
    height = 3.375 * inch

    buffer = io.BytesIO()
    p = canvas.Canvas(buffer, pagesize=(width, height))

    # Background
    p.setFillColorRGB(0.07, 0.09, 0.15) # Dark #111827
    p.rect(0, 0, width, height, fill=1)
    
    # Logo Header
    logo_path = os.path.join(settings.BASE_DIR, '..', 'frontend', 'public', 'upha.png')
    if os.path.exists(logo_path):
        try:
            p.drawImage(logo_path, width/2.0 - 0.3*inch, height - 0.7*inch, width=0.6*inch, height=0.6*inch, mask='auto')
        except Exception:
            pass

    p.setFillColorRGB(0.85, 0.48, 0.33) # d97c55
    p.setFont("Helvetica-Bold", 9)
    p.drawCentredString(width/2.0, height - 0.85*inch, "UTTAR PRADESH")
    p.drawCentredString(width/2.0, height - 0.97*inch, "HANDBALL ASSN.")

    # Role badge
    role_str = str(user.role).upper()
    if role_str == 'PLAYER':
        role_str = 'PLAYER MEMBERSHIP'
    
    # Premium Gold/Orange Accent Box
    p.setFillColorRGB(0.85, 0.48, 0.33)
    p.rect(0, height - 1.25*inch, width, 0.2*inch, fill=1, stroke=0)
    p.setFillColorRGB(1, 1, 1)
    p.setFont("Helvetica-Bold", 7)
    p.drawCentredString(width/2.0, height - 1.2*inch, role_str)

    # Photo (with accent border)
    photo_y = height - 2.2*inch
    p.setStrokeColorRGB(0.85, 0.48, 0.33)
    p.setLineWidth(1.5)
    p.rect(width/2.0 - 0.4*inch, photo_y, 0.8*inch, 0.8*inch, stroke=1, fill=0)
    
    has_photo = False
    if user.passport_image and hasattr(user.passport_image, 'path') and os.path.exists(user.passport_image.path):
        try:
            p.drawImage(user.passport_image.path, width/2.0 - 0.4*inch, photo_y, width=0.8*inch, height=0.8*inch)
            has_photo = True
        except Exception as e:
            pass
            
    if not has_photo:
        p.setFillColorRGB(0.2, 0.2, 0.2)
        p.rect(width/2.0 - 0.4*inch, photo_y, 0.8*inch, 0.8*inch, fill=1, stroke=0)
        p.setFillColorRGB(1, 1, 1)
        p.setFont("Helvetica-Bold", 16)
        initials = "".join([n[0] for n in user.name.split() if n])[:2].upper() if user.name else "??"
        p.drawCentredString(width/2.0, photo_y + 0.3*inch, initials)

    # Details
    p.setFillColorRGB(1, 1, 1)
    p.setFont("Times-Bold", 11)
    p.drawCentredString(width/2.0, photo_y - 0.2*inch, user.name.upper() if user.name else "")
    
    p.setFont("Helvetica-Bold", 5)
    p.setFillColorRGB(0.85, 0.48, 0.33)
    p.drawCentredString(width/2.0, photo_y - 0.35*inch, "ID NUMBER")
    p.setFillColorRGB(0.9, 0.9, 0.9)
    p.setFont("Helvetica", 8)
    role_prefix = user.role[:3].upper() if user.role else "MEM"
    p.drawCentredString(width/2.0, photo_y - 0.48*inch, f"UPHA-{role_prefix}-{str(user.id).zfill(5)}")

    # Footer
    p.setFillColorRGB(0.6, 0.6, 0.6)
    p.setFont("Helvetica-Oblique", 5)
    p.drawCentredString(width/2.0, 0.15*inch, "Khelo India Toh Khilega India")

    p.showPage()
    p.save()

    buffer.seek(0)
    response = HttpResponse(buffer, content_type='application/pdf')
    response['Content-Disposition'] = f'attachment; filename="upha_{user.role}_id_{user.id}.pdf"'
    return response


# ─── AGM Letters ──────────────────────────────────────────────────────────────

def _serialize_agm_letter(request, letter):
    return {
        'id': letter.id,
        'title': letter.title,
        'description': letter.description,
        'letter_date': str(letter.letter_date),
        'letter_type': letter.letter_type,
        'file': image_url(request, letter.file) if letter.file else None,
        'created_at': letter.created_at.isoformat(),
    }


@require_http_methods(['GET'])
def list_agm_letters(request):
    """Public endpoint — list all AGM letters ordered by date desc."""
    letters = AGMLetter.objects.all()
    return json_success(
        'AGM letters retrieved successfully.',
        letters=[_serialize_agm_letter(request, l) for l in letters],
    )


@csrf_exempt
@require_http_methods(['POST'])
def create_agm_letter(request):
    """Admin only — create a text letter or upload a PDF document."""
    guard = admin_required_response(request)
    if guard:
        return guard

    title = request.POST.get('title', '').strip()
    letter_date = request.POST.get('letter_date', '').strip()
    letter_type = request.POST.get('letter_type', 'text').strip()
    description = request.POST.get('description', '').strip()
    pdf_file = request.FILES.get('file')

    if not title:
        return json_error('Title is required.')
    if not letter_date:
        return json_error('Letter date is required.')
    if letter_type not in ('text', 'pdf'):
        return json_error('letter_type must be "text" or "pdf".')
    if letter_type == 'pdf' and not pdf_file:
        return json_error('A PDF file is required for PDF document type.')
    if letter_type == 'text' and not description:
        return json_error('Body text is required for a text letter.')

    try:
        letter = AGMLetter.objects.create(
            title=title,
            description=description,
            letter_date=letter_date,
            letter_type=letter_type,
            file=pdf_file,
            created_by=request.user if request.user.is_authenticated else None,
        )
    except Exception as exc:
        return json_error(str(exc))

    return json_success(
        'AGM letter created successfully.',
        letter=_serialize_agm_letter(request, letter),
    )


@csrf_exempt
@require_http_methods(['POST'])
def delete_agm_letter(request, letter_id):
    """Admin only — delete an AGM letter and its associated file."""
    guard = admin_required_response(request)
    if guard:
        return guard

    from django.shortcuts import get_object_or_404
    import os

    letter = get_object_or_404(AGMLetter, pk=letter_id)

    # Remove the physical file from disk if it exists
    if letter.file:
        try:
            if os.path.isfile(letter.file.path):
                os.remove(letter.file.path)
        except Exception:
            pass

    letter.delete()
    return json_success('AGM letter deleted successfully.')
@require_http_methods(['GET'])
def list_upha_forms(request):
    from .models import UPHAForm
    forms = UPHAForm.objects.all()
    data = []
    for form in forms:
        data.append({
            'id': form.id,
            'title': form.title,
            'file': image_url(request, form.file) if form.file else None,
            'created_at': form.created_at.isoformat(),
        })
    return json_success('Forms retrieved', forms=data)

@csrf_exempt
@require_http_methods(['POST'])
def create_upha_form(request):
    guard = admin_required_response(request)
    if guard: return guard
    
    title = request.POST.get('title')
    file = request.FILES.get('file')
    if not title or not file:
        return json_error('Title and file are required')
        
    from .models import UPHAForm
    form = UPHAForm.objects.create(title=title, file=file)
    return json_success('Form created', form={
        'id': form.id,
        'title': form.title,
        'file': image_url(request, form.file) if form.file else None,
        'created_at': form.created_at.isoformat(),
    })

@csrf_exempt
@require_http_methods(['POST', 'DELETE'])
def delete_upha_form(request, form_id):
    guard = admin_required_response(request)
    if guard: return guard
    
    from django.shortcuts import get_object_or_404
    from .models import UPHAForm
    import os
    form = get_object_or_404(UPHAForm, pk=form_id)
    if form.file:
        try:
            if os.path.isfile(form.file.path):
                os.remove(form.file.path)
        except Exception:
            pass
    form.delete()
    return json_success('Form deleted')
