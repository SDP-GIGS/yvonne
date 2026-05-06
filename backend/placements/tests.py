from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from users.models import CustomUser
from .models import InternshipPlacement


class PlacementTests(APITestCase):
    def setUp(self):
        self.admin = CustomUser.objects.create_superuser(username="admin", password="password123", role="ADMIN")
        self.student = CustomUser.objects.create_user(username="student1", password="password123", role="STUDENT")
        self.supervisor = CustomUser.objects.create_user(username="supervisor1", password="password123", role="SUPERVISOR")

    def test_student_cannot_create_placement(self):
        """RBAC: A student should not be able to create their own placement."""
        self.client.force_authenticate(user=self.student)
        data = {
            "student": self.student.id,
            "supervisor": self.supervisor.id,
            "company_name": "Makerere University IT Dept"
        }
        response = self.client.post('/api/placements/', data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_admin_can_create_placement(self):
        """RBAC: An admin must be able to assign a student to a supervisor."""
        self.client.force_authenticate(user=self.admin)
        data = {
            "student": self.student.id,
            "supervisor": self.supervisor.id,
            "company_name": "Makerere University IT Dept"
        }
        response = self.client.post('/api/placements/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

# Create your tests here.
