from django.urls import path

from . import views

urlpatterns = [
    path('register/district/', views.register_district, name='register_district'),
    path('districts/', views.list_districts, name='list_districts'),
]
