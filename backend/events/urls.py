from django.urls import path

from . import views

urlpatterns = [
    path('event-years/', views.list_event_years, name='list_event_years'),
    path('events/', views.list_events, name='list_events'),
    path('event-results/', views.list_event_results, name='list_event_results'),
]