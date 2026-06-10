from django.db import models

class PlayerAchievement(models.Model):
    name = models.CharField(max_length=255)
    district = models.CharField(max_length=255)
    position = models.CharField(max_length=255)
    player_id_str = models.CharField(max_length=255, blank=True)
    event_name = models.CharField(max_length=255)
    event_location = models.CharField(max_length=255)
    description = models.TextField()
    category_tag = models.CharField(max_length=255)
    color_theme = models.CharField(max_length=50, default='blue', choices=[
        ('blue', 'Blue'),
        ('orange', 'Orange'),
        ('green', 'Green'),
        ('dark', 'Dark'),
    ])
    created_at = models.DateTimeField(auto_now_add=True)

class CoachAchievement(models.Model):
    name = models.CharField(max_length=255)
    award_name = models.CharField(max_length=255)
    year = models.CharField(max_length=10)
    role_description = models.CharField(max_length=255)
    coach_id_str = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

class FederationAward(models.Model):
    year = models.CharField(max_length=10)
    award_name = models.CharField(max_length=255)
    awarded_by = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

class NationalMedal(models.Model):
    year = models.CharField(max_length=10)
    medal_type = models.CharField(max_length=50, choices=[
        ('GOLD', 'Gold'),
        ('SILVER', 'Silver'),
        ('BRONZE', 'Bronze'),
    ])
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    result = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
