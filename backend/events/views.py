from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from users.models import Player
from users.utils import get_request_data, json_error, json_success, serialize_event, serialize_event_result

from .models import Event, EventResults


def _event_year_label(event):
	start_year = event.start_date.year
	end_year_short = str(start_year + 1)[-2:]
	return f'{start_year}-{end_year_short}'


def _events_for_year(events, year_label):
	return [event for event in events if _event_year_label(event) == year_label]


@require_http_methods(['GET'])
def list_event_years(request):
	events = Event.objects.all().order_by('-start_date', '-id')
	year_map = {}
	for event in events:
		label = _event_year_label(event)
		year_map[label] = year_map.get(label, 0) + 1

	years = [
		{'label': label, 'event_count': count}
		for label, count in sorted(year_map.items(), key=lambda item: item[0], reverse=True)
	]
	return json_success('Event years retrieved successfully.', years=years)


@require_http_methods(['GET'])
def list_events(request):
	year_label = request.GET.get('year')
	events = Event.objects.all().order_by('-start_date', '-id')

	if year_label:
		events = _events_for_year(events, year_label)

	return json_success(
		'Events retrieved successfully.',
		year=year_label,
		events=[serialize_event(request, event) for event in events],
	)


@csrf_exempt
@require_http_methods(['POST'])
def create_event(request):
	data = get_request_data(request)
	required_fields = ['name', 'location', 'start_date', 'end_date', 'registration_end_date', 'category']
	missing_fields = [field for field in required_fields if not data.get(field)]
	if missing_fields:
		return json_error(f"Missing required fields: {', '.join(missing_fields)}")

	try:
		event = Event.objects.create(
			name=data.get('name', ''),
			location=data.get('location', ''),
			start_date=data.get('start_date'),
			end_date=data.get('end_date'),
			registration_end_date=data.get('registration_end_date'),
			category=data.get('category', ''),
		)
	except Exception as exc:
		return json_error(str(exc))

	return json_success('Event created successfully.', event=serialize_event(request, event))


@csrf_exempt
@require_http_methods(['POST'])
def delete_event(request, event_id):
	event = get_object_or_404(Event, pk=event_id)
	event.delete()
	return json_success('Event deleted successfully.')


@csrf_exempt
@require_http_methods(['POST'])
def add_event_result(request, event_id):
	data = get_request_data(request)
	player_id = data.get('player_id')
	position = data.get('position')
	if not player_id or position is None:
		return json_error('player_id and position are required.')

	event = get_object_or_404(Event, pk=event_id)
	player = get_object_or_404(Player, pk=player_id)

	try:
		result = EventResults.objects.create(event=event, player=player, position=int(position))
	except Exception as exc:
		return json_error(str(exc))

	return json_success('Event result saved successfully.', result=serialize_event_result(request, result))


@require_http_methods(['GET'])
def list_event_results(request):
	results = EventResults.objects.select_related('event', 'player__user').all().order_by('event_id', 'position')
	return json_success('Event results retrieved successfully.', results=[serialize_event_result(request, result) for result in results])
