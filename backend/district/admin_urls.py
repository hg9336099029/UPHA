from django.urls import path

from . import views

urlpatterns = [
	path('districts/<int:district_id>/payment/', views.update_district_payment_status, name='update_district_payment_status'),
]
