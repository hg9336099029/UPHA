from django.conf import settings
from django.db import models

class Academy(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True, related_name='academy_profile')
    name = models.CharField(max_length=255)
    district = models.CharField(max_length=255)
    year_of_establishment = models.IntegerField()
    logo = models.ImageField(upload_to='academy_logos/')
    trust_registration_number = models.CharField(max_length=255, blank=True, null=True)
    office_address = models.TextField()
    office_phone_number = models.CharField(max_length=20)
    email = models.EmailField(unique=True)
    website = models.URLField(blank=True, null=True)
    no_of_players = models.IntegerField()
    director = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='academy_director')
    coach_name = models.CharField(max_length=255, blank=True, null=True)
    coach_mobile = models.CharField(max_length=20, blank=True, null=True)
    coach_email = models.EmailField(blank=True, null=True)
    coach_upha_id = models.CharField(max_length=100, blank=True, null=True)
    coach_experience = models.IntegerField(default=0)
    registration_certificate = models.ImageField(upload_to='registration_certificates/', blank=True, null=True)
    transaction_id = models.CharField(max_length=255, unique=True)
    transaction_image = models.ImageField(upload_to='transaction_images/')
    paid = models.BooleanField(default=False)
    academy_type = models.CharField(max_length=100, blank=True, null=True)
    discipline_focus = models.CharField(max_length=255, blank=True, null=True)
    categories_trained = models.CharField(max_length=255, blank=True, null=True)
    coach_grade = models.CharField(max_length=100, blank=True, null=True)
    pin_code = models.CharField(max_length=10, blank=True, null=True)
    training_venue = models.CharField(max_length=255, blank=True, null=True)
    coaches_employed = models.IntegerField(default=0)
    address_proof = models.ImageField(upload_to='address_proofs/', blank=True, null=True)
    bank_details = models.ImageField(upload_to='bank_details/', blank=True, null=True)


class AcademyFacilityPhoto(models.Model):
    academy = models.ForeignKey(Academy, on_delete=models.CASCADE, related_name='facility_photos')
    image = models.ImageField(upload_to='academy_facilities/')

    def __str__(self):
        return f"Photo for {self.academy.name}"

