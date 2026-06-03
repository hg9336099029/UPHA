from django.contrib import admin

from .models import Academy


@admin.register(Academy)
class AcademyAdmin(admin.ModelAdmin):
	list_display = ('name', 'district', 'email', 'paid', 'no_of_players')
	search_fields = ('name', 'district', 'email', 'trust_registration_number')
