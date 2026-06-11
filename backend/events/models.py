from django.db import models
from users.models import Player

# Create your models here.

class Event(models.Model):
    name=models.CharField(max_length=255)
    location=models.CharField(max_length=255)
    start_date=models.DateField()
    end_date=models.DateField()
    registration_end_date=models.DateField()
    category=models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)


class EventResults(models.Model):
    event=models.ForeignKey(Event, on_delete=models.CASCADE)
    player=models.ForeignKey(Player, on_delete=models.CASCADE)
    position=models.IntegerField()

class EventAssignment(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='assignments')
    referee = models.ForeignKey('users.Referee', on_delete=models.CASCADE, related_name='assignments')
    status = models.CharField(max_length=50, choices=[('ASSIGNED', 'Assigned'), ('COMPLETED', 'Completed'), ('CANCELLED', 'Cancelled')], default='ASSIGNED')
    role = models.CharField(max_length=255, default='Match Referee')
    created_at = models.DateTimeField(auto_now_add=True)


class TournamentStanding(models.Model):
    """One row per team/district in a tournament's final standings."""
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='standings')
    position = models.PositiveIntegerField()   # 1 = 1st place, 2 = 2nd, etc.
    team_name = models.CharField(max_length=255)
    notes = models.CharField(max_length=500, blank=True, default='')

    class Meta:
        ordering = ['position']


class TournamentResult(models.Model):
    """Full result sheet for a tournament, uploaded by admin."""
    event = models.OneToOneField(Event, on_delete=models.CASCADE, related_name='result')
    final_date = models.DateField(null=True, blank=True)
    total_matches = models.PositiveIntegerField(null=True, blank=True)
    top_scorer = models.CharField(max_length=255, blank=True, default='')
    best_player = models.CharField(max_length=255, blank=True, default='')
    best_goalkeeper = models.CharField(max_length=255, blank=True, default='')
    most_promising_junior = models.CharField(max_length=255, blank=True, default='')
    scoresheet = models.FileField(upload_to='scoresheets/', null=True, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)