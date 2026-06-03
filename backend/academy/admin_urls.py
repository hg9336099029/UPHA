from django.urls import path

from . import views

urlpatterns = [
    path('academies/<int:academy_id>/payment/', views.update_academy_payment_status, name='update_academy_payment_status'),
]