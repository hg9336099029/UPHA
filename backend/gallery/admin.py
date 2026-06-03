from django.contrib import admin

from .models import Gallery


@admin.register(Gallery)
class GalleryAdmin(admin.ModelAdmin):
	list_display = ('title', 'content_type', 'created_at')
	list_filter = ('content_type', 'created_at')
	search_fields = ('title', 'description')
	readonly_fields = ('created_at', 'updated_at')
	date_hierarchy = 'created_at'
