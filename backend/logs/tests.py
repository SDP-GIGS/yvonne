from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from users.models import CustomUser

class LogAccessTest(APITestCase):
    def setUp(self):
        self.student_a = CustomUser.objects.create(username="student_a", role="STUDENT")
        self.student_b = CustomUser.objects.create(username="student_b", role="STUDENT")
        # Create a log for student B

    def test_student_cannot_see_others_logs(self):
        # Log in as Student A
        self.client.force_authenticate(user=self.student_a)
        
        # Try to access the list of logs
        url = reverse('weeklylog-list') # This matches your router name
        response = self.client.get(url)
        
        # Check that Student A sees 0 logs (since Student B owns the only log)
        self.assertEqual(len(response.data), 0)

# Create your tests here.
