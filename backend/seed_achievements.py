import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'upha_be.settings')
django.setup()

from achievements.models import PlayerAchievement, CoachAchievement, FederationAward

PlayerAchievement.objects.all().delete()
CoachAchievement.objects.all().delete()
FederationAward.objects.all().delete()

players = [
    {
        'name': 'Arjun Verma', 'district': 'Lucknow', 'position': 'Left Back', 'player_id_str': 'PLR-00417',
        'event_name': 'Asian Championship 2024 - Bahrain',
        'description': 'India Senior Men squad - played in 4 matches - scored 11 goals across the tournament.',
        'category_tag': 'ASIAN CHAMPIONSHIP', 'color_theme': 'dark'
    },
    {
        'name': 'Rohit Kashyap', 'district': 'Lucknow', 'position': 'Right Wing', 'player_id_str': 'PLR-00421',
        'event_name': 'Asian Beach Games 2023 - Sanya',
        'description': 'India Beach Handball squad - finished 5th - top-scored for India in the group stage.',
        'category_tag': 'ASIAN BEACH GAMES', 'color_theme': 'dark'
    },
    {
        'name': 'Priya Singh', 'district': 'Varanasi', 'position': 'Centre Back', 'player_id_str': 'PLR-00305',
        'event_name': 'Asian Junior Championship 2023 - Tehran',
        'description': 'India Junior Women squad - captained the team in pool matches - selected to U-21 camp.',
        'category_tag': 'ASIAN JUNIOR', 'color_theme': 'orange'
    },
    {
        'name': 'Saurabh Kumar', 'district': 'Varanasi', 'position': 'Goalkeeper', 'player_id_str': 'PLR-00298',
        'event_name': 'South Asian Games 2022 - Kathmandu',
        'description': 'India Senior Men goalkeeper - bronze medal - saved a penalty in the bronze playoff.',
        'category_tag': 'SOUTH ASIAN GAMES', 'color_theme': 'orange'
    },
    {
        'name': 'Vinay Mehta', 'district': 'Lucknow', 'position': 'Pivot', 'player_id_str': 'PLR-00234',
        'event_name': 'Asian Youth Championship 2024 - Manama',
        'description': 'India U-19 squad - came on as substitute in 5 matches - product of the Vajra Sports Academy.',
        'category_tag': 'ASIAN YOUTH', 'color_theme': 'green'
    },
    {
        'name': 'Anita Yadav', 'district': 'Kanpur Nagar', 'position': 'Specialist', 'player_id_str': 'PLR-00342',
        'event_name': 'Asian Beach Championship 2022 - Antalya',
        'description': 'India Beach Women squad - played all 6 matches - selected for the 2025 World Beach Games trials.',
        'category_tag': 'ASIAN BEACH', 'color_theme': 'blue'
    }
]

for p in players:
    PlayerAchievement.objects.create(**p)

coaches = [
    {
        'name': 'Anil Sharma', 'award_name': 'Dronacharya Award Nominee', 'year': '2023',
        'role_description': 'Head Coach, Vajra Sports Academy', 'coach_id_str': 'CCH-00128'
    },
    {
        'name': 'R. K. Trivedi', 'award_name': 'HAI National Best Coach', 'year': '2021',
        'role_description': 'Director, Vajra Sports Academy', 'coach_id_str': 'CCH-00091'
    },
    {
        'name': 'Smt. Geeta Devi', 'award_name': 'HAI Special Recognition', 'year': '2024',
        'role_description': 'State Coach', 'coach_id_str': 'CCH-00067'
    }
]

for c in coaches:
    CoachAchievement.objects.create(**c)

awards = [
    {
        'year': '2024', 'award_name': 'BEST STATE FEDERATION AWARD',
        'awarded_by': 'Awarded by the Handball Association of India - New Delhi'
    },
    {
        'year': '2022', 'award_name': 'SPORTS AUTHORITY OF INDIA RECOGNITION',
        'awarded_by': 'For grassroots handball development programme in U.P. districts'
    },
    {
        'year': '2019', 'award_name': 'U.P. SPORTS EXCELLENCE AWARD',
        'awarded_by': 'Awarded by the Department of Sports & Youth Welfare, Govt. of U.P.'
    }
]

for a in awards:
    FederationAward.objects.create(**a)

print('Seeded achievements successfully!')
