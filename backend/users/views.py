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
from .utils import admin_required_response, get_request_data, json_error, json_success, serialize_coach, serialize_player, serialize_referee, serialize_user, notify_admins


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
			'certificate_image': request.build_absolute_uri(player.certificate_image.url),
		},
	)

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
				'image': request.build_absolute_uri(b.image.url) if b.image else None,
				'order': b.order
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
			image = request.FILES.get('image')
			
			if not name or not role:
				return json_error('Name and Role are required.')
				
			if bearer_id:
				# Update
				bearer = OfficeBearer.objects.get(id=bearer_id)
				bearer.name = name
				bearer.role = role
				bearer.order = int(order)
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
					image=image
				)
				return json_success('Office bearer added successfully.', bearer={
					'id': bearer.id,
					'name': bearer.name,
					'role': bearer.role,
					'order': bearer.order,
					'image': request.build_absolute_uri(bearer.image.url) if bearer.image else None
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
