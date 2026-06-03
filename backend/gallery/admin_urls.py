from django.urls import path

from . import views

urlpatterns = [
	path('gallery/', views.list_gallery_items, name='list_gallery_items'),
	path('gallery/create/', views.create_gallery_item, name='create_gallery_item'),
	path('gallery/<int:item_id>/update/', views.update_gallery_item, name='update_gallery_item'),
	path('gallery/<int:item_id>/delete/', views.delete_gallery_item, name='delete_gallery_item'),
]