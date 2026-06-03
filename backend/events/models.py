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