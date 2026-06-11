from django.urls import path

from . import views

urlpatterns = [
    path('events/create/', views.create_event, name='create_event'),
    path('events/<int:event_id>/delete/', views.delete_event, name='delete_event'),
    path('events/<int:event_id>/results/', views.add_event_result, name='add_event_result'),
    path('events/<int:event_id>/upload-results/', views.upload_tournament_results, name='upload_tournament_results'),
]