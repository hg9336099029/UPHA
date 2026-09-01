import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'upha_be.settings')
django.setup()

from users.models import User
from django.contrib.auth.hashers import make_password

email = 'admin@upha.in'
password = 'adminpassword123'

user, created = User.objects.get_or_create(
    email=email,
    defaults={
        'username': 'admin_new',
        'name': 'New Admin',
        'role': 'admin',
        'is_staff': True,
        'is_superuser': True,
        'password': make_password(password)
    }
)

if not created:
    user.password = make_password(password)
    user.role = 'admin'
    user.is_staff = True
    user.is_superuser = True
    user.save()
    print("Admin user updated.")
else:
    print("Admin user created.")
