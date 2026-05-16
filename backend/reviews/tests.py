from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from users.models import CustomUser
from logs.models import WeeklyLog
from placements.models import InternshipPlacement


class ReviewTests(APITestCase):
    def setUp(self):
        self.supervisor = CustomUser.objects.create_user(username="sup", role="SUPERVISOR")
        self.wrong_supervisor = CustomUser.objects.create_user(username="wrong_sup", role="SUPERVISOR")
        self.student = CustomUser.objects.create_user(username="std", role="STUDENT")
        
        self.placement = InternshipPlacement.objects.create(
            student=self.student, supervisor=self.supervisor, company_name="Tech Solutions"
        )
        self.log = WeeklyLog.objects.create(student=self.student, content="Completed Phase 1")

    def test_unauthorized_supervisor_cannot_review(self):
        """Business Logic: Only the supervisor assigned to the student can review their logs."""
        self.client.force_authenticate(user=self.wrong_supervisor)
        data = {"log": self.log.id, "comment": "Good job", "rating": 5}
        response = self.client.post('/api/reviews/log-reviews/', data)
        # This checks the validation logic you wrote in your ReviewViewSet
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

# Create your tests here.




