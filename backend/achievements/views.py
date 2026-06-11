from django.http import JsonResponse
import json
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from users.utils import admin_required_response, json_success, json_error
from .models import PlayerAchievement, CoachAchievement, FederationAward, NationalMedal

@require_http_methods(['GET'])
def list_achievements(request):
    players = list(PlayerAchievement.objects.all().order_by('-created_at').values())
    coaches = list(CoachAchievement.objects.all().order_by('-created_at').values())
    awards = list(FederationAward.objects.all().order_by('-year').values())
    medals = list(NationalMedal.objects.all().order_by('-year').values())

    # Include tournament results uploaded by admin
    from events.models import TournamentResult, TournamentStanding
    tournament_results = []
    for result in TournamentResult.objects.select_related('event').order_by('-event__start_date'):
        standings = list(
            TournamentStanding.objects.filter(event=result.event).order_by('position').values(
                'position', 'team_name', 'notes'
            )
        )
        tournament_results.append({
            'event_id': result.event_id,
            'event_name': result.event.name,
            'event_location': result.event.location,
            'event_category': result.event.category,
            'final_date': str(result.final_date) if result.final_date else None,
            'total_matches': result.total_matches,
            'top_scorer': result.top_scorer,
            'best_player': result.best_player,
            'best_goalkeeper': result.best_goalkeeper,
            'most_promising_junior': result.most_promising_junior,
            'uploaded_at': result.uploaded_at.isoformat(),
            'standings': standings,
        })

    return JsonResponse({
        'success': True,
        'players': players,
        'coaches': coaches,
        'awards': awards,
        'medals': medals,
        'tournament_results': tournament_results,
    })

@csrf_exempt
@require_http_methods(['POST'])
def create_player_achievement(request):
    admin_response = admin_required_response(request)
    if admin_response:
        return admin_response
    
    # ... logic to create if needed ...
    return JsonResponse({'success': True})

@csrf_exempt
@require_http_methods(['POST', 'PUT', 'DELETE'])
def manage_medals(request):
    try:
        if request.method == 'DELETE':
            data = json.loads(request.body)
            medal_id = data.get('id')
            NationalMedal.objects.filter(id=medal_id).delete()
            return json_success('Medal deleted successfully')

        # For POST/PUT, handle either multipart or JSON
        if request.content_type == 'application/json':
            data = json.loads(request.body)
        else:
            data = request.POST

        medal_id = data.get('id')
        year = data.get('year')
        medal_type = data.get('medal_type')
        title = data.get('title')
        description = data.get('description')
        category = data.get('category')
        result = data.get('result')

        if request.method == 'POST':
            NationalMedal.objects.create(
                year=year, medal_type=medal_type, title=title,
                description=description, category=category, result=result
            )
            return json_success('Medal created successfully')
        elif request.method == 'PUT':
            NationalMedal.objects.filter(id=medal_id).update(
                year=year, medal_type=medal_type, title=title,
                description=description, category=category, result=result
            )
            return json_success('Medal updated successfully')
    except Exception as e:
        return json_error(str(e), status=400)


@csrf_exempt
@require_http_methods(['POST', 'PUT', 'DELETE'])
def manage_players(request):
    try:
        if request.method == 'DELETE':
            data = json.loads(request.body)
            player_id = data.get('id')
            PlayerAchievement.objects.filter(id=player_id).delete()
            return json_success('Player achievement deleted successfully')

        if request.content_type == 'application/json':
            data = json.loads(request.body)
        else:
            data = request.POST

        ach_id = data.get('id')
        name = data.get('name')
        district = data.get('district')
        position = data.get('position')
        event_name = data.get('event_name')
        event_location = data.get('event_location')
        description = data.get('description')
        category_tag = data.get('category_tag')
        color_theme = data.get('color_theme', 'blue')

        if request.method == 'POST':
            PlayerAchievement.objects.create(
                name=name, district=district, position=position,
                event_name=event_name, event_location=event_location,
                description=description, category_tag=category_tag,
                color_theme=color_theme
            )
            return json_success('Player achievement created successfully')
        elif request.method == 'PUT':
            PlayerAchievement.objects.filter(id=ach_id).update(
                name=name, district=district, position=position,
                event_name=event_name, event_location=event_location,
                description=description, category_tag=category_tag,
                color_theme=color_theme
            )
            return json_success('Player achievement updated successfully')
    except Exception as e:
        return json_error(str(e), status=400)


@csrf_exempt
@require_http_methods(['POST', 'PUT', 'DELETE'])
def manage_coaches(request):
    try:
        if request.method == 'DELETE':
            data = json.loads(request.body)
            coach_id = data.get('id')
            CoachAchievement.objects.filter(id=coach_id).delete()
            return json_success('Coach achievement deleted successfully')

        if request.content_type == 'application/json':
            data = json.loads(request.body)
        else:
            data = request.POST

        ach_id = data.get('id')
        name = data.get('name')
        award_name = data.get('award_name')
        year = data.get('year')
        role_description = data.get('role_description')

        if request.method == 'POST':
            CoachAchievement.objects.create(
                name=name, award_name=award_name, year=year,
                role_description=role_description
            )
            return json_success('Coach achievement created successfully')
        elif request.method == 'PUT':
            CoachAchievement.objects.filter(id=ach_id).update(
                name=name, award_name=award_name, year=year,
                role_description=role_description
            )
            return json_success('Coach achievement updated successfully')
    except Exception as e:
        return json_error(str(e), status=400)


@csrf_exempt
@require_http_methods(['POST', 'PUT', 'DELETE'])
def manage_awards(request):
    try:
        if request.method == 'DELETE':
            data = json.loads(request.body)
            award_id = data.get('id')
            FederationAward.objects.filter(id=award_id).delete()
            return json_success('Award deleted successfully')

        if request.content_type == 'application/json':
            data = json.loads(request.body)
        else:
            data = request.POST

        ach_id = data.get('id')
        year = data.get('year')
        award_name = data.get('award_name')
        awarded_by = data.get('awarded_by')

        if request.method == 'POST':
            FederationAward.objects.create(
                year=year, award_name=award_name, awarded_by=awarded_by
            )
            return json_success('Award created successfully')
        elif request.method == 'PUT':
            FederationAward.objects.filter(id=ach_id).update(
                year=year, award_name=award_name, awarded_by=awarded_by
            )
            return json_success('Award updated successfully')
    except Exception as e:
        return json_error(str(e), status=400)
