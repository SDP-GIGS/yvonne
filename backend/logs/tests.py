from rest_framework.test import APITestCase
from django.urls import reverse
from users.models import CustomUser

class LogAccessTest(APITestCase):
    def setUp(self):
        self.student_a = CustomUser.objects.create_user(username='student_a', password='testpass', role='student')
        self.user = CustomUser.objects.create_user(email="supervisor@test.com", password="testpassword123", role="SUPERVISOR")
        self.student_b = CustomUser.objects.create_user(username='student_b', password='testpass', role='student')
        self.wrong_supervisor = CustomUser.objects.create_user(email="wrong_sup@test.com", password="password123", role="SUPERVISOR")
        #self.student = CustomUser.objects.create_user(email="std@test.com", password="password123", role="STUDENT")
        #self.log_for_b = Log.objects.create(student=self.student_b, content="Student B's private log")
        #  Create a log for student B
        

    def test_student_cannot_see_others_logs(self):
        # Log in as Student A
        self.client.force_authenticate(user=self.student_a)
        
        # Try to access the list of logs
        url = reverse('weeklylog-list') # This matches your router name
        response = self.client.get(url)
        
        # Check that Student A sees 0 logs (since Student B owns the only log)
        self.assertEqual(len(response.data), 0)

# Create your tests here.
 