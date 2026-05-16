from django.db import models
from django.conf import settings


class WeeklyLog(models.Model):
    class Status(models.TextChoices):
        DRAFT = 'DRAFT', 'Draft'
        SUBMITTED = 'SUBMITTED', 'Submitted'
        REVIEWED = 'REVIEWED', 'Reviewed'
        APPROVED = 'APPROVED', 'Approved'

    student = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='logs'
    )
    week_number = models.PositiveIntegerField()
    start_date = models.DateField()
    end_date = models.DateField()

    activities_performed = models.TextField(blank=True, null=True)
    lessons_learned = models.TextField(blank=True, null=True)
    challenges_faced = models.TextField(blank=True, null=True)

    Academic_supervisor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='academic_logs'
    )
    placement_supervisor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='placement_logs'
    )

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.DRAFT
    )


    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['student', 'week_number']

    def __str__(self):
        # FIX: was student.username but USERNAME_FIELD is email
        return f"Week {self.week_number} - {self.student.email}"


