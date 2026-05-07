from django.test import TestCase
from .models import AcademicEvaluation
from placements.models import InternshipPlacement
from users.models import CustomUser

class EvaluationLogicTest(TestCase):
    def setUp(self):
        # Create a sample user and placement for the test
        self.user = CustomUser.objects.create(username="test_supervisor", role="SUPERVISOR")
        # Assume placement is created here...

    def test_weighted_score_calculation(self):
        eval = AcademicEvaluation.objects.create(
            organization_score=80, # 40% = 32
            logbook_score=70,      # 30% = 21
            final_report_score=90, # 30% = 27
            supervisor=self.user
        )
        # 32 + 21 + 27 = 80
        self.assertEqual(eval.calculate_final_grade, 80.0)
# Create your tests here.



