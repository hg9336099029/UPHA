import requests
import uuid
import sys

BASE_URL = "http://127.0.0.1:8000/api"

# Helper to generate unique string
def uid():
    return str(uuid.uuid4())[:8]

def run_test(name, fn):
    print(f"Testing {name}...", end=" ")
    try:
        success, details = fn()
        if success:
            print(f"[OK]")
        else:
            print(f"[FAILED] - {details}")
    except Exception as e:
        print(f"[ERROR] - {str(e)}")

# GET endpoints
def test_get_players():
    res = requests.get(f"{BASE_URL}/players/")
    return res.status_code == 200, res.status_code

def test_get_coaches():
    res = requests.get(f"{BASE_URL}/coaches/")
    return res.status_code == 200, res.status_code

def test_get_referees():
    res = requests.get(f"{BASE_URL}/referees/")
    return res.status_code == 200, res.status_code

def test_get_academies():
    res = requests.get(f"{BASE_URL}/academies/")
    return res.status_code == 200, res.status_code

def test_get_events():
    res = requests.get(f"{BASE_URL}/events/")
    return res.status_code == 200, res.status_code

def test_get_event_results():
    res = requests.get(f"{BASE_URL}/event-results/")
    return res.status_code == 200, res.status_code

def test_get_event_years():
    res = requests.get(f"{BASE_URL}/event-years/")
    return res.status_code == 200, res.status_code

# POST endpoints
def test_register_player():
    unique_id = uid()
    data = {
        "name": f"Player {unique_id}",
        "email": f"player_{unique_id}@example.com",
        "phone_number": f"1234567890",
        "password": "password123",
        "gender": "Male",
        "blood_group": "O+",
        "district": "Lucknow",
        "dominant_hand": "right",
        "height": "180",
        "weight": "75",
        "adhar_number": unique_id + "1234",
        "transaction_id": "TXN_PL_" + unique_id
    }
    files = {
        "passport_image": ("passport.jpg", b"fake_image", "image/jpeg"),
        "adhar_image": ("adhar.jpg", b"fake_image", "image/jpeg"),
        "transaction_image": ("txn.jpg", b"fake_image", "image/jpeg")
    }
    res = requests.post(f"{BASE_URL}/register/player/", data=data, files=files)
    if res.status_code == 200 and res.json().get('success'):
        return True, res.status_code
    return False, f"Status: {res.status_code}, Response: {res.text}"

def test_register_coach():
    unique_id = uid()
    data = {
        "name": f"Coach {unique_id}",
        "email": f"coach_{unique_id}@example.com",
        "phone_number": f"1234567890",
        "password": "password123",
        "gender": "Male",
        "district": "Lucknow",
        "adhar_number": unique_id + "5678",
        "transaction_id": "TXN_CO_" + unique_id,
        "highest_coaching_grade": "Grade A"
    }
    files = {
        "passport_image": ("passport.jpg", b"fake_image", "image/jpeg"),
        "adhar_image": ("adhar.jpg", b"fake_image", "image/jpeg"),
        "transaction_image": ("txn.jpg", b"fake_image", "image/jpeg")
    }
    res = requests.post(f"{BASE_URL}/register/coach/", data=data, files=files)
    if res.status_code == 200 and res.json().get('success'):
        return True, res.status_code
    return False, f"Status: {res.status_code}, Response: {res.text}"

def test_register_referee():
    unique_id = uid()
    data = {
        "name": f"Referee {unique_id}",
        "email": f"referee_{unique_id}@example.com",
        "phone_number": f"1234567890",
        "password": "password123",
        "gender": "Male",
        "district": "Lucknow",
        "adhar_number": unique_id + "9012",
        "transaction_id": "TXN_RF_" + unique_id,
        "grade_applying_for": "Grade 1",
        "year_of_officiating_experience": 5,
        "highest_level_officiated": "State",
        "tournament_officiated": "State Cup 2023",
        "previous_referee_id": "PREV_REF_" + unique_id,
        "occupation": "government",
    }
    files = {
        "passport_image": ("passport.jpg", b"fake_image", "image/jpeg"),
        "adhar_image": ("adhar.jpg", b"fake_image", "image/jpeg"),
        "transaction_image": ("txn.jpg", b"fake_image", "image/jpeg")
    }
    res = requests.post(f"{BASE_URL}/register/referee/", data=data, files=files)
    if res.status_code == 200 and res.json().get('success'):
        return True, res.status_code
    return False, f"Status: {res.status_code}, Response: {res.text}"

def test_register_district():
    unique_id = uid()
    data = {
        # District details
        "name": f"District Association {unique_id}",
        "district": "Lucknow",
        "year_of_establishment": 2000,
        "trust_registration_number": "SR/" + unique_id,
        "office_address": "123 Main Street, Lucknow",
        "office_phone_number": "0522-123456",
        "email": f"district_{unique_id}@example.com",
        "no_of_players": 50,
        "transaction_id": "TXN_DS_" + unique_id,
        # Adhyaksha
        "adhyaksha_name": f"Adhyaksha {unique_id}",
        "adhyaksha_father_name": "Father Adhyaksha",
        "adhyaksha_phone_number": "9000000001",
        "adhyaksha_email": f"adhyaksha_{unique_id}@example.com",
        "adhyaksha_adhar_number": unique_id + "AD01",
        # Sachiv
        "sachiv_name": f"Sachiv {unique_id}",
        "sachiv_father_name": "Father Sachiv",
        "sachiv_phone_number": "9000000002",
        "sachiv_email": f"sachiv_{unique_id}@example.com",
        "sachiv_adhar_number": unique_id + "SA02",
        # Koshadhyaksha
        "koshadhyaksha_name": f"Koshadhyaksha {unique_id}",
        "koshadhyaksha_father_name": "Father Koshadhyaksha",
        "koshadhyaksha_phone_number": "9000000003",
        "koshadhyaksha_email": f"kosha_{unique_id}@example.com",
        "koshadhyaksha_adhar_number": unique_id + "KO03",
    }
    files = {
        "logo": ("logo.jpg", b"fake_image", "image/jpeg"),
        "registration_certificate": ("cert.jpg", b"fake_image", "image/jpeg"),
        "transaction_image": ("txn.jpg", b"fake_image", "image/jpeg"),
        "adhyaksha_adhar_image": ("adhar.jpg", b"fake_image", "image/jpeg"),
        "adhyaksha_passport_image": ("passport.jpg", b"fake_image", "image/jpeg"),
        "sachiv_adhar_image": ("adhar.jpg", b"fake_image", "image/jpeg"),
        "sachiv_passport_image": ("passport.jpg", b"fake_image", "image/jpeg"),
        "koshadhyaksha_adhar_image": ("adhar.jpg", b"fake_image", "image/jpeg"),
        "koshadhyaksha_passport_image": ("passport.jpg", b"fake_image", "image/jpeg"),
    }
    res = requests.post(f"{BASE_URL}/register/district/", data=data, files=files)
    if res.status_code == 200 and res.json().get('success'):
        return True, res.status_code
    return False, f"Status: {res.status_code}, Response: {res.text}"

def test_login():
    data = {"email": "admin@upha.in", "password": "admin123"}
    res = requests.post(f"{BASE_URL}/login/", json=data)
    return res.status_code == 200 and res.json().get('success'), f"Status: {res.status_code}"

if __name__ == "__main__":
    print("--- Running API Tests ---")
    
    # Public GET requests
    run_test("GET /api/players/", test_get_players)
    run_test("GET /api/coaches/", test_get_coaches)
    run_test("GET /api/referees/", test_get_referees)
    run_test("GET /api/academies/", test_get_academies)
    run_test("GET /api/events/", test_get_events)
    run_test("GET /api/event-results/", test_get_event_results)
    run_test("GET /api/event-years/", test_get_event_years)
    
    # POST registrations
    run_test("POST /api/register/player/", test_register_player)
    run_test("POST /api/register/coach/", test_register_coach)
    run_test("POST /api/register/referee/", test_register_referee)
    run_test("POST /api/register/district/", test_register_district)
    
    print("--- Done ---")

