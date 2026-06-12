from django.http import JsonResponse

from events.models import EventResults


def create_admin_notification(title, message):
    """Send a notification to all admin users."""
    from users.models import User, Notification
    admins = User.objects.filter(role='admin')
    for admin in admins:
        Notification.objects.create(
            user=admin,
            title=title,
            message=message,
        )

def create_user_notification(user, title, message):
    """Send a notification to a specific user."""
    from users.models import Notification
    Notification.objects.create(
        user=user,
        title=title,
        message=message,
    )

def get_request_data(request):
    if request.content_type and 'application/json' in request.content_type:
        import json

        try:
            return json.loads(request.body.decode('utf-8') or '{}')
        except json.JSONDecodeError:
            return {}
    return request.POST


def json_error(message, status=400, **extra):
    payload = {'success': False, 'message': message}
    payload.update(extra)
    return JsonResponse(payload, status=status)


def json_success(message, status=200, **extra):
    payload = {'success': True, 'message': message}
    payload.update(extra)
    return JsonResponse(payload, status=status)


def is_admin_user(user):
    return bool(user and user.is_authenticated and user.role == 'admin')


def admin_required_response(request):
    user = getattr(request, 'user', None)
    if not is_admin_user(user):
        return json_error('Admin access required.', status=403)
    return None


def image_url(request, file_field):
    if not file_field:
        return None
    try:
        return request.build_absolute_uri(file_field.url)
    except ValueError:
        return None

def log_decision(request, applicant_type, applicant_id, action, applicant_name_ref, details, notes=''):
    from users.models import DecisionLog
    DecisionLog.objects.create(
        applicant_type=applicant_type,
        applicant_id=applicant_id,
        action=action,
        applicant_name_ref=applicant_name_ref,
        details=details,
        admin=request.user if request.user.is_authenticated else None,
        notes=notes
    )


def serialize_user(request, user):
    return {
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'name': user.name,
        'role': user.role,
        'phone_number': user.phone_number,
        'gender': user.gender,
        'father_name': user.father_name,
        'mother_name': user.mother_name,
        'blood_group': user.blood_group,
        'date_of_birth': str(user.date_of_birth) if user.date_of_birth else None,
        'adhar_number': user.adhar_number,
        'adhar_image': image_url(request, user.adhar_image),
        'passport_image': image_url(request, user.passport_image),
        'created_at': user.created_at,
    }


def serialize_player(request, player):
    return {
        'id': player.id,
        'user': serialize_user(request, player.user),
        'district': player.district,
        'dominant_hand': player.dominant_hand,
        'club_name': player.club_name,
        'school_name': player.school_name,
        'coach_name': player.coach_name,
        'height': player.height,
        'weight': player.weight,
        'transaction_id': player.transaction_id,
        'transaction_image': image_url(request, player.transaction_image),
        'certificate_image': image_url(request, player.certificate_image),
        'paid': player.paid,
    }


def serialize_coach(request, coach):
    return {
        'id': coach.id,
        'user': serialize_user(request, coach.user),
        'district': coach.district,
        'occupation': coach.occupation,
        'highest_coaching_grade': coach.highest_coaching_grade,
        'transaction_id': coach.transaction_id,
        'transaction_image': image_url(request, coach.transaction_image),
        'paid': coach.paid,
    }


def serialize_referee(request, referee):
    return {
        'id': referee.id,
        'user': serialize_user(request, referee.user),
        'district': referee.district,
        'occupation': referee.occupation,
        'grade_applying_for': referee.grade_applying_for,
        'year_of_officiating_experience': referee.year_of_officiating_experience,
        'highest_level_officiated': referee.highest_level_officiated,
        'tournament_officiated': referee.tournament_officiated,
        'previous_referee_id': referee.previous_referee_id,
        'transaction_id': referee.transaction_id,
        'transaction_image': image_url(request, referee.transaction_image),
        'paid': referee.paid,
    }


def serialize_academy(request, academy):
    return {
        'id': academy.id,
        'name': academy.name,
        'district': academy.district,
        'year_of_establishment': academy.year_of_establishment,
        'logo': image_url(request, academy.logo),
        'trust_registration_number': academy.trust_registration_number,
        'office_address': academy.office_address,
        'office_phone_number': academy.office_phone_number,
        'email': academy.email,
        'website': academy.website,
        'no_of_players': academy.no_of_players,
        'adhyaksha': serialize_user(request, academy.adhyaksha) if academy.adhyaksha_id else None,
        'sachiv': serialize_user(request, academy.sachiv) if academy.sachiv_id else None,
        'koshadhyaksha': serialize_user(request, academy.koshadhyaksha) if academy.koshadhyaksha_id else None,
        'coach_name': academy.coach_name,
        'coach_mobile': academy.coach_mobile,
        'coach_email': academy.coach_email,
        'coach_experience': academy.coach_experience,
        'registration_certificate': image_url(request, academy.registration_certificate),
        'transaction_id': academy.transaction_id,
        'transaction_image': image_url(request, academy.transaction_image),
        'paid': academy.paid,
    }


def serialize_district(request, district):
    return {
        'id': district.id,
        'name': district.name,
        'district': district.district,
        'year_of_establishment': district.year_of_establishment,
        'logo': image_url(request, district.logo),
        'trust_registration_number': district.trust_registration_number,
        'office_address': district.office_address,
        'office_phone_number': district.office_phone_number,
        'email': district.email,
        'website': district.website,
        'no_of_players': district.no_of_players,
        'adhyaksha': serialize_user(request, district.adhyaksha) if district.adhyaksha_id else None,
        'sachiv': serialize_user(request, district.sachiv) if district.sachiv_id else None,
        'koshadhyaksha': serialize_user(request, district.koshadhyaksha) if district.koshadhyaksha_id else None,
        'registration_certificate': image_url(request, district.registration_certificate),
        'transaction_id': district.transaction_id,
        'transaction_image': image_url(request, district.transaction_image),
        'paid': district.paid,
    }


def serialize_event(request, event):
    results = EventResults.objects.filter(event=event).select_related('player__user').order_by('position')
    return {
        'id': event.id,
        'name': event.name,
        'location': event.location,
        'start_date': event.start_date,
        'end_date': event.end_date,
        'registration_end_date': event.registration_end_date,
        'category': event.category,
        'created_at': event.created_at,
        'results': [serialize_event_result(request, result) for result in results],
    }


def serialize_event_result(request, result):
    return {
        'id': result.id,
        'event': {
            'id': result.event_id,
            'name': result.event.name if result.event_id else None,
        },
        'player': serialize_player(request, result.player),
        'position': result.position,
    }