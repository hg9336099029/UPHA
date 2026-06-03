from django.contrib import admin

from .models import Event, EventResults


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
	list_display = ('name', 'location', 'start_date', 'end_date', 'category')
	search_fields = ('name', 'location', 'category')


@admin.register(EventResults)
class EventResultsAdmin(admin.ModelAdmin):
	list_display = ('event', 'player', 'position')
	search_fields = ('event__name', 'player__user__name', 'player__user__email')
