from django.urls import path

from . import views

urlpatterns = [
    path('players/<int:player_id>/payment/', views.update_player_payment_status, name='update_player_payment_status'),
    path('players/<int:player_id>/certificate/', views.upload_player_certificate, name='upload_player_certificate'),
    path('coaches/<int:coach_id>/payment/', views.update_coach_payment_status, name='update_coach_payment_status'),
    path('referees/<int:referee_id>/payment/', views.update_referee_payment_status, name='update_referee_payment_status'),
]