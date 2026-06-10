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
    path('change-password/', views.change_password, name='change_password'),
]