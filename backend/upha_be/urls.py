"""
URL configuration for the UPHA project.
"""

from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),

    # Public API
    path('api/', include('users.urls')),
    path('api/', include('academy.urls')),
    path('api/', include('events.urls')),

    # Admin-only API (protected by AdminRoleMiddleware)
    path('api/admin/', include('users.admin_urls')),
    path('api/admin/', include('academy.admin_urls')),
    path('api/admin/', include('events.admin_urls')),
    path('api/admin/', include('gallery.admin_urls')),
    path('api/', include('district.urls')),
    path('api/', include('gallery.urls')),
    path('api/', include('achievements.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
