from django.contrib import admin

from .models import Coach, Player, Referee, User, OfficeBearer


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
	list_display = ('email', 'username', 'name', 'role', 'is_staff', 'created_at')
	list_filter = ('role', 'is_staff')
	search_fields = ('email', 'username', 'name', 'phone_number')


@admin.register(Player)
class PlayerAdmin(admin.ModelAdmin):
	list_display = ('user', 'district', 'club_name', 'school_name', 'paid')
	search_fields = ('user__email', 'user__name', 'district', 'club_name')


@admin.register(Coach)
class CoachAdmin(admin.ModelAdmin):
	list_display = ('user', 'district', 'occupation', 'highest_coaching_grade', 'paid')
	search_fields = ('user__email', 'user__name', 'district')


@admin.register(Referee)
class RefereeAdmin(admin.ModelAdmin):
	list_display = ('user', 'district', 'occupation', 'grade_applying_for', 'paid')
	search_fields = ('user__email', 'user__name', 'district', 'previous_referee_id')
