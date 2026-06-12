from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json

from users.utils import admin_required_response, get_request_data, json_error, json_success, image_url
from events.models import Event
from .models import Gallery, GalleryAlbum, GalleryPhoto


def serialize_gallery_item(request, item):
	return {
		'id': item.id,
		'title': item.title,
		'content_type': item.content_type,
		'content_type_display': item.get_content_type_display(),
		'description': item.description,
		'media_file': image_url(request, item.media_file),
		'created_at': item.created_at,
		'updated_at': item.updated_at,
	}

def serialize_album(request, album):
    cover_photo = album.photos.filter(is_cover=True).first()
    if not cover_photo:
        cover_photo = album.photos.first()
    
    event_data = None
    if album.event:
        event_data = {
            'id': album.event.id,
            'name': album.event.name,
            'location': album.event.location,
            'category': album.event.category,
        }
        
    return {
        'id': album.id,
        'title': album.title,
        'category': album.category,
        'description': album.description,
        'date': album.date,
        'event': event_data,
        'cover_photo': image_url(request, cover_photo.image) if cover_photo else None,
        'photo_count': album.photos.count(),
        'photos': [image_url(request, photo.image) for photo in album.photos.all()],
        'created_at': album.created_at,
    }


@require_http_methods(['GET'])
def list_gallery_items(request):
	content_type = request.GET.get('content_type')
	items = Gallery.objects.all().order_by('-created_at', '-id')
	if content_type:
		items = items.filter(content_type=content_type)
	return json_success('Gallery items retrieved successfully.', items=[serialize_gallery_item(request, item) for item in items])


@csrf_exempt
@require_http_methods(['POST'])
def create_gallery_item(request):
	admin_response = admin_required_response(request)
	if admin_response:
		return admin_response

	data = get_request_data(request)
	media_file = request.FILES.get('media_file')
	title = (data.get('title') or '').strip()
	content_type = data.get('content_type')

	if not title or not content_type or not media_file:
		return json_error('title, content_type, and media_file are required.')

	if content_type not in Gallery.ContentType.values:
		return json_error('Invalid content_type. Must be press_release, achievement, photo, or video.')

	item = Gallery.objects.create(
		title=title,
		content_type=content_type,
		description=(data.get('description') or '').strip(),
		media_file=media_file,
	)
	return json_success('Gallery item created successfully.', item=serialize_gallery_item(request, item))


@csrf_exempt
@require_http_methods(['POST'])
def update_gallery_item(request, item_id):
	admin_response = admin_required_response(request)
	if admin_response:
		return admin_response

	item = get_object_or_404(Gallery, pk=item_id)
	data = get_request_data(request)

	title = (data.get('title') or item.title).strip()
	content_type = data.get('content_type') or item.content_type
	description = data.get('description')
	media_file = request.FILES.get('media_file')

	if content_type not in Gallery.ContentType.values:
		return json_error('Invalid content_type. Must be press_release, achievement, photo, or video.')

	item.title = title
	item.content_type = content_type
	if description is not None:
		item.description = description.strip()
	if media_file:
		item.media_file = media_file
	item.save()
	return json_success('Gallery item updated successfully.', item=serialize_gallery_item(request, item))


@csrf_exempt
@require_http_methods(['POST'])
def delete_gallery_item(request, item_id):
	admin_response = admin_required_response(request)
	if admin_response:
		return admin_response

	item = get_object_or_404(Gallery, pk=item_id)
	item.delete()
	return json_success('Gallery item deleted successfully.')


@require_http_methods(['GET'])
def list_albums(request):
    albums = GalleryAlbum.objects.all().order_by('-created_at', '-id')
    return json_success('Albums retrieved successfully.', albums=[serialize_album(request, album) for album in albums])


@csrf_exempt
@require_http_methods(['POST'])
def create_album(request):
    admin_response = admin_required_response(request)
    if admin_response:
        return admin_response

    title = request.POST.get('title', '').strip()
    description = request.POST.get('description', '').strip()
    category = request.POST.get('category', '').strip()
    date_str = request.POST.get('date', '').strip()
    event_id = request.POST.get('event_id')
    cover_index = request.POST.get('cover_index', '0')
    try:
        cover_index = int(cover_index)
    except:
        cover_index = 0

    if not title:
        return json_error('Album title is required.')

    event = None
    if event_id:
        try:
            event = Event.objects.get(id=event_id)
        except Event.DoesNotExist:
            return json_error('Invalid event.')

    album = GalleryAlbum.objects.create(
        title=title,
        category=category,
        description=description,
        date=date_str if date_str else None,
        event=event
    )

    photos = request.FILES.getlist('photos')
    for index, photo_file in enumerate(photos):
        is_cover = (index == cover_index)
        GalleryPhoto.objects.create(
            album=album,
            image=photo_file,
            is_cover=is_cover
        )

    return json_success('Album created successfully.', album=serialize_album(request, album))
