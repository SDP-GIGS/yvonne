from django.db import models
from django.conf import settings
from placements.models import InternshipPlacement # Import your placement model

class AcademicEvaluation(models.Model):
    placement = models.OneToOneField(InternshipPlacement, on_remote=models.CASCADE)
    supervisor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    
    # Grading Criteria (Week 9)
    
    organization_score = models.FloatField(default=0.0) # 40%
    logbook_score = models.FloatField(default=0.0)      # 30%
    final_report_score = models.FloatField(default=0.0) # 30%
    
    comments = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_auto_now_add=True)


    @property
    
    def final_weighted_score(self):
        # Weighted Score Computation Logic
        return (self.organization_score * 0.4) + (self.logbook_score * 0.3) + (self.final_report_score * 0.3)

    def __str__(self):
        return f"Evaluation for {self.placement.student.username}"

# Create your models here.
