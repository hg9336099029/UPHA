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