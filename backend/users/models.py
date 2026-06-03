import re

from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models


class CustomUserManager(UserManager):
    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('The email must be set.')

        email = self.normalize_email(email)
        username = extra_fields.get('username')
        if not username:
            base_username = re.sub(r'[^a-zA-Z0-9_]+', '_', email.split('@')[0]).strip('_').lower() or 'user'
            username = base_username
            suffix = 1
            while self.model.objects.filter(username=username).exists():
                suffix += 1
                username = f'{base_username}{suffix}'
            extra_fields['username'] = username

        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_admin(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('role', 'admin')
        extra_fields.setdefault('is_superuser', False)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Admin users must have is_staff=True.')
        if extra_fields.get('role') != 'admin':
            raise ValueError('Admin users must have role="admin".')

        return self.create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        return self.create_admin(email, password, **extra_fields)


class User(AbstractUser):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255)
    father_name = models.CharField(max_length=255, blank=True)
    mother_name = models.CharField(max_length=255, blank=True)
    gender = models.CharField(max_length=10, blank=True)
    blood_group = models.CharField(max_length=5, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    phone_number = models.CharField(max_length=20, blank=True)
    adhar_number = models.CharField(max_length=20, unique=True, null=True, blank=True)
    adhar_image = models.ImageField(upload_to='adhar_images/', null=True, blank=True)
    passport_image = models.ImageField(upload_to='passport_images/', null=True, blank=True)
    role = models.CharField(
        max_length=20,
        choices=[('admin', 'Admin'), ('coach', 'Coach'), ('player', 'Player'), ('referee', 'Referee')],
        default='player',
    )
    created_at = models.DateTimeField(auto_now_add=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email or self.username
    


class Coach(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    district = models.CharField(max_length=255)
    occupation = models.CharField(max_length=255,choices=[('government', 'Government'), ('private', 'Private'), ('self_employed', 'Self Employed')], default='self_employed')
    highest_coaching_grade = models.CharField(max_length=255)
    transaction_id = models.CharField(max_length=255, unique=True)
    transaction_image = models.ImageField(upload_to='transaction_images/')
    paid=models.BooleanField(default=False)

class Player(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    district = models.CharField(max_length=255)
    dominant_hand = models.CharField(max_length=10, choices=[('left', 'Left'), ('right', 'Right')], default='right')
    club_name = models.CharField(max_length=255)
    school_name = models.CharField(max_length=255)
    coach_name = models.CharField(max_length=255)
    height = models.FloatField()
    weight = models.FloatField()
    transaction_id = models.CharField(max_length=255, unique=True)
    transaction_image = models.ImageField(upload_to='transaction_images/')
    certificate_image = models.ImageField(upload_to='certificate_images/', null=True, blank=True)
    paid=models.BooleanField(default=False)

class Referee(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    district = models.CharField(max_length=255)
    occupation = models.CharField(max_length=255, choices=[('government', 'Government'), ('private', 'Private'), ('self_employed', 'Self Employed')], default='self_employed')
    grade_applying_for = models.CharField(max_length=255)
    year_of_officiating_experience = models.IntegerField()
    highest_level_officiated = models.CharField(max_length=255)
    tournament_officiated = models.TextField()
    previous_referee_id = models.CharField(max_length=255, unique=True)
    transaction_id = models.CharField(max_length=255, unique=True)
    transaction_image = models.ImageField(upload_to='transaction_images/')
    paid = models.BooleanField(default=False)
