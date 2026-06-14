from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from users.models import User
from users.utils import create_user_notification

class Command(BaseCommand):
    help = 'Generates notifications for users whose validity expires in 25 days.'

    def handle(self, *args, **options):
        now = timezone.now()
        target_date = now + timedelta(days=25)
        
        # We look for users whose valid_through is strictly between 14 and 15 days from now
        # so we only notify them once.
        start_date = target_date - timedelta(days=1)
        
        expiring_users = User.objects.filter(
            valid_through__gt=start_date,
            valid_through__lte=target_date
        )

        count = 0
        for user in expiring_users:
            create_user_notification(
                user,
                "Renewal Required",
                "Your membership/accreditation will expire in 25 days. Please click 'Renew' on your dashboard to submit your renewal."
            )
            count += 1

        self.stdout.write(self.style.SUCCESS(f'Successfully generated {count} renewal notifications.'))
