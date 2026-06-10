from django.urls import path

from . import views

urlpatterns = [
    path('register/admin/', views.register_admin, name='register_admin'),
    path('register/player/', views.register_player, name='register_player'),
    path('register/coach/', views.register_coach, name='register_coach'),
    path('register/referee/', views.register_referee, name='register_referee'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('me/', views.me_view, name='me'),
    path('players/', views.list_players, name='list_players'),
    path('coaches/', views.list_coaches, name='list_coaches'),
    path('referees/', views.list_referees, name='list_referees'),
    path('search/player/', views.search_players, name='search_players'),
    path('player/certificate/', views.get_my_certificate, name='get_my_certificate'),
    path('invite-admin/', views.invite_admin, name='invite_admin'),
    path('update-credentials/', views.update_credentials, name='update_credentials'),
    path('notifications/', views.get_notifications, name='get_notifications'),
    path('notifications/<int:notif_id>/read/', views.mark_notification_read, name='mark_notification_read'),
    path('office-bearers/', views.list_office_bearers, name='list_office_bearers'),
    path('stats/', views.get_global_stats, name='get_global_stats'),
]