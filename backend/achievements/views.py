from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from users.utils import admin_required_response
from .models import PlayerAchievement, CoachAchievement, FederationAward

@require_http_methods(['GET'])
def list_achievements(request):
    players = list(PlayerAchievement.objects.all().order_by('-created_at').values())
    coaches = list(CoachAchievement.objects.all().order_by('-created_at').values())
    awards = list(FederationAward.objects.all().order_by('-year').values())
    
    return JsonResponse({
        'success': True,
        'players': players,
        'coaches': coaches,
        'awards': awards
    })

@csrf_exempt
@require_http_methods(['POST'])
def create_player_achievement(request):
    admin_response = admin_required_response(request)
    if admin_response:
        return admin_response
    
    # ... logic to create if needed ...
    return JsonResponse({'success': True})
