from django.conf import settings
from django.db import models

class Academy(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True, related_name='academy_profile')
    name = models.CharField(max_length=255)
    district = models.CharField(max_length=255)
    year_of_establishment = models.IntegerField()
    logo = models.ImageField(upload_to='academy_logos/')
    trust_registration_number = models.CharField(max_length=255, unique=True)
    office_address = models.TextField()
    office_phone_number = models.CharField(max_length=20)
    email = models.EmailField(unique=True)
    website = models.URLField(blank=True, null=True)
    no_of_players = models.IntegerField()
    adhyaksha = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='academy_adhyaksha')
    sachiv = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='academy_sachiv')
    koshadhyaksha = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='academy_koshadhyaksha')
    registration_certificate = models.ImageField(upload_to='registration_certificates/')
    transaction_id = models.CharField(max_length=255, unique=True)
    transaction_image = models.ImageField(upload_to='transaction_images/')
    paid = models.BooleanField(default=False)
