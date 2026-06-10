from django.urls import path
from . import views

urlpatterns = [
    path('achievements/', views.list_achievements, name='list_achievements'),
]
