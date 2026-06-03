from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from users.utils import admin_required_response, get_request_data, json_error, json_success, image_url

from .models import Gallery


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
