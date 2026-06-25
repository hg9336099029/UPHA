from django.urls import path

from . import views

urlpatterns = [
    path('players/<int:player_id>/payment/', views.update_player_payment_status, name='update_player_payment_status'),
    path('players/<int:player_id>/certificate/', views.upload_player_certificate, name='upload_player_certificate'),
    path('players/search/', views.search_players_for_cert, name='search_players_for_cert'),
    path('coaches/<int:coach_id>/payment/', views.update_coach_payment_status, name='update_coach_payment_status'),
    path('referees/<int:referee_id>/payment/', views.update_referee_payment_status, name='update_referee_payment_status'),
    path('reject/', views.reject_application, name='reject_application'),
    path('stats/', views.get_admin_stats, name='get_admin_stats'),
    path('decisions/', views.get_recent_decisions, name='get_recent_decisions'),
    path('announcements/create/', views.create_announcement, name='create_announcement'),
    path('office-bearers/', views.manage_office_bearers, name='manage_office_bearers'),
    path('settings/', views.update_system_settings, name='update_system_settings'),
    path('events/participants/', views.get_event_participants_for_certificates, name='get_event_participants_for_certificates'),
    path('events/<int:event_id>/issue-certificates/', views.issue_event_certificates, name='issue_event_certificates'),
]