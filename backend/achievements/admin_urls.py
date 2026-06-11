from django.urls import path
from . import views

urlpatterns = [
    path('achievements/medals/', views.manage_medals, name='manage_medals'),
    path('achievements/players/', views.manage_players, name='manage_players'),
    path('achievements/coaches/', views.manage_coaches, name='manage_coaches'),
    path('achievements/awards/', views.manage_awards, name='manage_awards'),
]
