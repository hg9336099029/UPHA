from django.test import TestCase
from django.urls import reverse

from .models import Player, Referee, User


class AdminRegistrationTests(TestCase):
	def test_register_admin_creates_admin_role_user(self):
		response = self.client.post(
			reverse('register_admin'),
			{
				'email': 'admin@example.com',
				'password': 'secure-pass-123',
				'name': 'Admin User',
				'username': 'adminuser',
			},
		)

		self.assertEqual(response.status_code, 200)
		self.assertTrue(response.json()['success'])
		user = User.objects.get(email='admin@example.com')
		self.assertEqual(user.role, 'admin')
		self.assertTrue(user.is_staff)
		self.assertFalse(user.is_superuser)

	def test_admin_api_requires_admin_role(self):
		user = User.objects.create_user(
			email='player@example.com',
			password='secure-pass-123',
			name='Player User',
			username='playeruser',
			role='player',
		)
		self.client.force_login(user)

		response = self.client.post(reverse('update_player_payment_status', args=[1]), {'paid': True})

		self.assertEqual(response.status_code, 403)


class RefereeRouteTests(TestCase):
	def test_register_referee_creates_referee_role_user(self):
		response = self.client.post(
			reverse('register_referee'),
			{
				'email': 'referee@example.com',
				'password': 'secure-pass-123',
				'name': 'Referee User',
				'username': 'refereeuser',
				'district': 'Central',
				'occupation': 'private',
				'grade_applying_for': 'State',
				'year_of_officiating_experience': 5,
				'highest_level_officiated': 'District',
				'tournament_officiated': 'Summer Cup',
				'previous_referee_id': 'REF-001',
				'transaction_id': 'TXN-001',
			},
		)

		self.assertEqual(response.status_code, 200)
		payload = response.json()
		self.assertTrue(payload['success'])
		self.assertEqual(payload['referee']['user']['role'], 'referee')
		self.assertTrue(User.objects.filter(email='referee@example.com', role='referee').exists())

	def test_list_referees_returns_created_referee(self):
		user = User.objects.create_user(
			email='referee@example.com',
			password='secure-pass-123',
			name='Referee User',
			username='refereeuser',
			role='referee',
		)
		Referee.objects.create(
			user=user,
			district='Central',
			occupation='private',
			grade_applying_for='State',
			year_of_officiating_experience=5,
			highest_level_officiated='District',
			tournament_officiated='Summer Cup',
			previous_referee_id='REF-001',
			transaction_id='TXN-001',
		)

		response = self.client.get(reverse('list_referees'))

		self.assertEqual(response.status_code, 200)
		payload = response.json()
		self.assertTrue(payload['success'])
		self.assertEqual(len(payload['referees']), 1)
		self.assertEqual(payload['referees'][0]['user']['email'], 'referee@example.com')

	def test_me_returns_referee_profile(self):
		user = User.objects.create_user(
			email='referee@example.com',
			password='secure-pass-123',
			name='Referee User',
			username='refereeuser',
			role='referee',
		)
		referee = Referee.objects.create(
			user=user,
			district='Central',
			occupation='private',
			grade_applying_for='State',
			year_of_officiating_experience=5,
			highest_level_officiated='District',
			tournament_officiated='Summer Cup',
			previous_referee_id='REF-001',
			transaction_id='TXN-001',
		)
		self.client.force_login(user)

		response = self.client.get(reverse('me'))

		self.assertEqual(response.status_code, 200)
		payload = response.json()
		self.assertTrue(payload['success'])
		self.assertEqual(payload['user']['id'], referee.id)
		self.assertEqual(payload['user']['user']['role'], 'referee')

	def test_admin_can_update_referee_payment_status(self):
		admin = User.objects.create_user(
			email='admin@example.com',
			password='secure-pass-123',
			name='Admin User',
			username='adminuser',
			role='admin',
			is_staff=True,
		)
		user = User.objects.create_user(
			email='referee@example.com',
			password='secure-pass-123',
			name='Referee User',
			username='refereeuser',
			role='referee',
		)
		referee = Referee.objects.create(
			user=user,
			district='Central',
			occupation='private',
			grade_applying_for='State',
			year_of_officiating_experience=5,
				highest_level_officiated='District',
			tournament_officiated='Summer Cup',
			previous_referee_id='REF-001',
			transaction_id='TXN-001',
		)
		self.client.force_login(admin)

		response = self.client.post(reverse('update_referee_payment_status', args=[referee.id]), {'paid': True})

		self.assertEqual(response.status_code, 200)
		payload = response.json()
		self.assertTrue(payload['success'])
		referee.refresh_from_db()
		self.assertTrue(referee.paid)


class SearchPlayerApiTests(TestCase):
	def test_search_players_by_email_returns_matching_player(self):
		user = User.objects.create_user(
			email='player@example.com',
			password='secure-pass-123',
			name='Player User',
			username='playeruser',
			role='player',
			phone_number='9999999999',
			adhar_number='123456789012',
		)
		player = Player.objects.create(
			user=user,
			district='Central',
			dominant_hand='right',
			club_name='City Club',
			school_name='City School',
			coach_name='Coach One',
			height=170,
			weight=65,
			transaction_id='TXN-100',
		)

		response = self.client.get(reverse('search_players'), {'email': 'player@example.com'})

		self.assertEqual(response.status_code, 200)
		payload = response.json()
		self.assertTrue(payload['success'])
		self.assertEqual(len(payload['players']), 1)
		self.assertEqual(payload['players'][0]['id'], player.id)
		self.assertEqual(payload['players'][0]['user']['email'], 'player@example.com')

	def test_search_players_returns_404_when_no_player_matches(self):
		response = self.client.get(reverse('search_players'), {'email': 'missing@example.com'})

		self.assertEqual(response.status_code, 404)
		payload = response.json()
		self.assertFalse(payload['success'])
		self.assertEqual(payload['message'], 'No players found matching the search criteria.')
