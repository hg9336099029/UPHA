import os
import sys
import django
import datetime
import random

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'upha_be.settings')
django.setup()

from django.contrib.auth import get_user_model
from django.db import transaction
from django.contrib.auth.hashers import make_password
from users.models import Player, Coach, Referee, OfficeBearer, DecisionLog, Notification
from academy.models import Academy
from district.models import District
from events.models import Event, EventResults
from gallery.models import Gallery, GalleryAlbum, GalleryPhoto
from achievements.models import PlayerAchievement, CoachAchievement, FederationAward, NationalMedal

User = get_user_model()

print("Clearing database...")
User.objects.all().delete()
Event.objects.all().delete()
GalleryAlbum.objects.all().delete()
Gallery.objects.all().delete()
OfficeBearer.objects.all().delete()
PlayerAchievement.objects.all().delete()
CoachAchievement.objects.all().delete()
FederationAward.objects.all().delete()
NationalMedal.objects.all().delete()

# Pre-compute password hash to save time
dummy_password = make_password('pass123')

# Random variation pools
CITIES = ["Lucknow", "Kanpur", "Varanasi", "Agra", "Prayagraj", "Meerut", "Ghaziabad", "Bareilly", "Aligarh", "Moradabad", "Saharanpur", "Gorakhpur", "Noida", "Firozabad", "Jhansi"]
FIRST_NAMES = ["Amit", "Rahul", "Priya", "Sneha", "Vikram", "Suresh", "Ramesh", "Deepak", "Anil", "Sunita", "Anita", "Geeta", "Arjun", "Karan", "Ravi", "Sanjay", "Neha", "Pooja"]
LAST_NAMES = ["Sharma", "Verma", "Singh", "Yadav", "Gupta", "Mishra", "Pandey", "Tiwari", "Patel", "Kumar", "Chauhan", "Rajput", "Srivastava"]
SCHOOLS = ["DPS", "CMS", "St. Johns", "KV", "Army Public School", "St. Marys", "Saraswati Vidya Mandir"]
CLUBS = ["Warriors", "Strikers", "Titans", "Royals", "Spartans", "Knights", "Challengers", "Blasters"]
EVENT_ADJS = ["State", "Inter-District", "Zonal", "Invitational", "Memorial", "Open", "Selection"]
EVENT_TYPES = ["Championship", "League", "Tournament", "Cup", "Trophy", "Trials"]

def random_name():
    return f"{random.choice(FIRST_NAMES)} {random.choice(LAST_NAMES)}"

@transaction.atomic
def seed_data():
    print("Seeding Users and Profiles...")

    super_admin = User.objects.create(email='superadmin@upha.com', username='superadmin', name='Super Admin', role='admin', is_staff=True, is_superuser=True, password=make_password('admin123'))
    
    print("Creating 10 Admins...")
    admin_users = []
    for i in range(1, 11):
        u = User.objects.create(email=f'admin{i}@upha.com', username=f'admin{i}', name=f'{random_name()} Admin', role='admin', is_staff=True, password=dummy_password)
        admin_users.append(u)

    # Districts (75)
    print("Creating 75 Districts...")
    districts = []
    for i in range(1, 76):
        city = CITIES[i % len(CITIES)]
        u = User.objects.create(email=f'district{i}@upha.com', username=f'district{i}', name=f'{city} District Association', role='district', password=dummy_password)
        districts.append(u)
        District.objects.create(
            user=u, name=f'{city} District Handball Association {i}', district=city, year_of_establishment=1980 + random.randint(0, 40),
            trust_registration_number=f'DTR-{random.randint(1000, 9999)}{i}', office_address=f'Sports Stadium, {city}', office_phone_number=f'98765{random.randint(10000,99999)}',
            email=f'info{i}@{city.lower()}handball.com', no_of_players=random.randint(100, 2000), adhyaksha=admin_users[0], sachiv=admin_users[1], koshadhyaksha=super_admin,
            transaction_id=f'TXN-DIS-{random.randint(10000,99999)}{i}', paid=True
        )

    # Academies (50)
    print("Creating 50 Academies...")
    for i in range(1, 51):
        city = random.choice(CITIES)
        u = User.objects.create(email=f'academy{i}@upha.com', username=f'academy{i}', name=f'{city} Sports Academy', role='academy', password=dummy_password)
        Academy.objects.create(
            user=u, name=f'{city} {random.choice(["Elite", "Pro", "Youth", "National"])} Handball Academy {i}', district=city, year_of_establishment=2000 + random.randint(0, 23),
            trust_registration_number=f'ATR-{random.randint(1000, 9999)}{i}', office_address=f'Main Road, {city}', office_phone_number=f'88765{random.randint(10000,99999)}',
            email=f'contact{i}@academy.com', no_of_players=random.randint(20, 300), director=admin_users[2],
            transaction_id=f'TXN-ACA-{random.randint(10000,99999)}{i}', paid=True
        )

    # Players (1200)
    print("Creating 1200 Players...")
    users_to_create = [
        User(email=f'player{i}@upha.com', username=f'player{i}', name=random_name(), role='player', password=dummy_password, phone_number=f'78765{i:05d}')
        for i in range(1, 1201)
    ]
    User.objects.bulk_create(users_to_create, batch_size=500)
    created_players = list(User.objects.filter(role='player').order_by('id'))
    
    players_to_create = [
        Player(user=created_players[i], district=random.choice(CITIES), dominant_hand=random.choice(['left', 'right', 'right', 'right']), club_name=f'{random.choice(CITIES)} {random.choice(CLUBS)}',
               school_name=f'{random.choice(SCHOOLS)} {random.choice(CITIES)}', coach_name=random_name(), height=random.randint(160, 195), weight=random.randint(55, 90),
               transaction_id=f'TXN-PLR-{100000+i}', paid=True)
        for i in range(1200)
    ]
    Player.objects.bulk_create(players_to_create, batch_size=500)

    # Coaches (240)
    print("Creating 240 Coaches...")
    coach_users = [
        User(email=f'coach{i}@upha.com', username=f'coach{i}', name=random_name(), role='coach', password=dummy_password, phone_number=f'68765{i:05d}')
        for i in range(1, 241)
    ]
    User.objects.bulk_create(coach_users, batch_size=200)
    created_coaches = list(User.objects.filter(role='coach').order_by('id'))
    
    coaches_to_create = [
        Coach(user=created_coaches[i], district=random.choice(CITIES), occupation=random.choice(['government', 'private', 'self_employed']), highest_coaching_grade=random.choice(['Grade A', 'Grade B', 'Grade C', 'Diploma']),
              transaction_id=f'TXN-CCH-{100000+i}', paid=True)
        for i in range(240)
    ]
    Coach.objects.bulk_create(coaches_to_create, batch_size=200)

    # Referees (50)
    print("Creating 50 Referees...")
    referee_users = [
        User(email=f'referee{i}@upha.com', username=f'referee{i}', name=random_name(), role='referee', password=dummy_password)
        for i in range(1, 51)
    ]
    User.objects.bulk_create(referee_users)
    created_referees = list(User.objects.filter(role='referee').order_by('id'))
    
    referees_to_create = [
        Referee(user=created_referees[i], district=random.choice(CITIES), occupation=random.choice(['government', 'private', 'self_employed']), grade_applying_for=random.choice(['State Level', 'National Level']),
                year_of_officiating_experience=random.randint(1, 15), highest_level_officiated=random.choice(['District', 'State', 'National']),
                tournament_officiated=f'{random.choice(CITIES)} {random.choice(EVENT_ADJS)} Championship',
                previous_referee_id=f'REF-{1000+i}', transaction_id=f'TXN-REF-{100000+i}', paid=True)
        for i in range(50)
    ]
    Referee.objects.bulk_create(referees_to_create)

    print("Creating 120 Tournaments...")
    today = datetime.date.today()
    events_to_create = []
    for i in range(1, 121):
        offset = random.randint(-180, 180) # Past half year to next half year
        start = today + datetime.timedelta(days=offset)
        duration = random.randint(2, 6)
        cat = random.choice(['TOURNAMENT', 'TOURNAMENT', 'TOURNAMENT', 'TRIAL'])
        events_to_create.append(
            Event(name=f'UP {random.choice(EVENT_ADJS)} Handball {random.choice(EVENT_TYPES)} {start.year}', 
                  location=f'Sports Complex, {random.choice(CITIES)}',
                  start_date=start, end_date=start + datetime.timedelta(days=duration),
                  registration_end_date=start - datetime.timedelta(days=random.randint(5, 15)),
                  category=cat)
        )
    Event.objects.bulk_create(events_to_create, batch_size=100)

    # Generate 15 Gallery Albums from past events
    print("Seeding Gallery & Albums...")
    past_events = list(Event.objects.filter(start_date__lt=today).order_by('-start_date')[:15])
    for idx, event in enumerate(past_events):
        album = GalleryAlbum.objects.create(title=f'Highlights: {event.name}', description=f'Official photos from the {event.location} event.', date=event.start_date, event=event)
        # Mock cover photo and standard photos using null (frontend handles fallback)
        pass
    
    print("Seeding Office Bearers (Full Council)...")
    ob_data = [
        ('DR. SUDHIR M. BOBDE', 'CHAIRMAN', 1),
        ('SMT. ALKA DAS', 'PRESIDENT', 2),
        ('VINAY KUMAR SINGH', 'TREASURER', 3),
        ('AMIT PANDEY', 'EXEC. SECRETARY GENERAL', 4),
        ('DR. ANANDESHWAR PANDEY', 'SECRETARY GENERAL', 5),
        ('MR. RAJESH TIWARI', 'VICE PRESIDENT', 6),
        ('MR. SANJEEV KUMAR', 'VICE PRESIDENT', 7),
        ('MS. ANITA SHARMA', 'VICE PRESIDENT', 8),
        ('MR. DEEPAK SINGH', 'VICE PRESIDENT', 9),
        ('MR. RAHUL VERMA', 'JOINT SECRETARY', 10),
        ('MR. VIKAS YADAV', 'JOINT SECRETARY', 11),
        ('MS. PRIYANKA GUPTA', 'JOINT SECRETARY', 12),
        ('MR. ANIL CHATURVEDI', 'EXECUTIVE MEMBER', 13),
        ('MR. SURENDRA PATEL', 'EXECUTIVE MEMBER', 14),
        ('MR. MANISH MISHRA', 'EXECUTIVE MEMBER', 15),
        ('MS. KAVITA RANI', 'EXECUTIVE MEMBER', 16),
        ('MR. ASHOK PANDEY', 'EXECUTIVE MEMBER', 17),
    ]
    for name, role, order in ob_data:
        OfficeBearer.objects.create(name=name, role=role, order=order)

    print("Seeding Achievements...")
    NationalMedal.objects.create(year="2024", medal_type="BRONZE", title="30TH NATIONAL SUB-JUNIOR CHAMPIONSHIP", description="Hosted by Telangana Handball Assn. - Hyderabad", category="SUB-JUNIOR GIRLS", result="3rd Place")
    NationalMedal.objects.create(year="2023", medal_type="SILVER", title="25TH JUNIOR NATIONAL CHAMPIONSHIP", description="Hosted by Tamil Nadu Handball Assn. - Chennai", category="JUNIOR BOYS", result="Runner-up")
    NationalMedal.objects.create(year="2021", medal_type="GOLD", title="23RD JUNIOR NATIONAL CHAMPIONSHIP", description="Hosted by Goa Handball Assn. - Panaji", category="JUNIOR BOYS", result="Champion")
    NationalMedal.objects.create(year="2019", medal_type="BRONZE", title="67TH SENIOR NATIONAL CHAMPIONSHIP", description="Hosted by Punjab Handball Assn. - Patiala", category="SENIOR WOMEN", result="3rd Place")
    NationalMedal.objects.create(year="2018", medal_type="GOLD", title="66TH SENIOR NATIONAL CHAMPIONSHIP", description="Hosted by Odisha Handball Assn. - Bhubaneswar", category="SENIOR MEN", result="Champion")

    PlayerAchievement.objects.create(name='Arjun Verma', district='Lucknow', position='Left Back', player_id_str='PLR-00417', event_name='Asian Championship 2024 - Bahrain', description='India Senior Men squad', category_tag='ASIAN CHAMPIONSHIP', color_theme='dark')
    PlayerAchievement.objects.create(name='Priya Singh', district='Varanasi', position='Centre Back', player_id_str='PLR-00305', event_name='Asian Junior Championship 2023 - Tehran', description='India Junior Women squad', category_tag='ASIAN JUNIOR', color_theme='orange')

    CoachAchievement.objects.create(name='Anil Sharma', award_name='Dronacharya Award Nominee', year='2023', role_description='Head Coach', coach_id_str='CCH-00128')
    FederationAward.objects.create(year='2024', award_name='BEST STATE FEDERATION AWARD', awarded_by='Handball Association of India')

    from users.models import Certificate
    from events.models import EventAssignment

    print("Seeding Certificates...")
    certificates_to_create = []
    
    for r in created_referees:
        certificates_to_create.append(Certificate(
            user=r, title="ANNUAL REFEREE ACCREDITATION · 2026", status="Active", details="Grade A · State Panel · Valid through 31 Mar 2027", certificate_id=f"CERT-RFR-2026-{r.id:05d}", icon_type="Award"
        ))
        certificates_to_create.append(Certificate(
            user=r, title="REFEREEING GRADE CERTIFICATE - GRADE A", status="Permanent", details="Awarded 14 Jul 2023", certificate_id=f"CERT-GRD-RFR-23-{r.id:05d}", icon_type="Star"
        ))

    for c in created_coaches:
        certificates_to_create.append(Certificate(
            user=c, title="ANNUAL COACH ACCREDITATION · 2026", status="Active", details="Valid through 31 Mar 2027", certificate_id=f"CERT-CCH-2026-{c.id:05d}", icon_type="Award"
        ))
    
    for p in created_players[:50]: # Just seed for a few players to save time
        certificates_to_create.append(Certificate(
            user=p, title="ANNUAL MEMBERSHIP CERTIFICATE · 2026", status="Active", details="Valid through 31 Mar 2027", certificate_id=f"CERT-PLR-2026-{p.id:05d}", icon_type="Award"
        ))
        
    Certificate.objects.bulk_create(certificates_to_create, batch_size=500)

    print("Seeding Event Assignments for Referees...")
    assignments_to_create = []
    
    for r in created_referees:
        # Assign to 3 random past events and 2 upcoming events
        r_referee = Referee.objects.get(user=r)
        
        for e in random.sample(past_events, min(3, len(past_events))):
            assignments_to_create.append(EventAssignment(event=e, referee=r_referee, status="COMPLETED", role="Match Referee"))
            
        upcoming_events = list(Event.objects.filter(start_date__gte=today))
        if upcoming_events:
            for e in random.sample(upcoming_events, min(2, len(upcoming_events))):
                assignments_to_create.append(EventAssignment(event=e, referee=r_referee, status="ASSIGNED", role="Match Referee"))

    EventAssignment.objects.bulk_create(assignments_to_create, batch_size=500)

seed_data()
print("Mass seeding completed successfully with high variation!")
