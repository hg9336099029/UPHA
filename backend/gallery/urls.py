from django.urls import path

from . import views

urlpatterns = [
    path('gallery/albums/', views.list_albums, name='list_albums'),
    path('gallery/albums/create/', views.create_album, name='create_album'),
]
