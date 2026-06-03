from django.urls import path

from . import views

urlpatterns = [
    path('register/academy/', views.register_academy, name='register_academy'),
    path('academies/', views.list_academies, name='list_academies'),
]