import requests

url = "http://127.0.0.1:8000/api/register/player/"

data = {
    "name": "Test Player",
    "email": "test@example.com",
    "phone_number": "1234567890",
    "password": "password123",
    "date_of_birth": "2000-01-01",
    "gender": "Male",
    "father_name": "Test Father",
    "mother_name": "Test Mother",
    "blood_group": "O+",
    "district": "Lucknow",
    "dominant_hand": "right",
    "club_name": "",
    "school_name": "",
    "coach_name": "",
    "height": "180",
    "weight": "75",
    "adhar_number": "123456789012",
    "transaction_id": "TXN12345"
}

files = {
    "passport_image": ("passport.jpg", b"fake_image_content", "image/jpeg"),
    "adhar_image": ("adhar.jpg", b"fake_image_content", "image/jpeg"),
    "transaction_image": ("txn.jpg", b"fake_image_content", "image/jpeg")
}

response = requests.post(url, data=data, files=files)
print(f"Status Code: {response.status_code}")
print(f"Response: {response.text}")
