from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model

from logs.models import WeeklyLog
from .models import Notification


User = get_user_model()


@receiver(post_save, sender=User)
def student_created(sender, instance, created, **kwargs):

    if created and getattr(instance, "role", None) == "STUDENT":

        Notification.objects.create(
            user=instance,
            message="Your ILES student account was created."
        )


@receiver(post_save, sender=WeeklyLog)
def log_submitted(sender, instance, created, **kwargs):

    if instance.status == WeeklyLog.Status.SUBMITTED:

        supervisor = instance.placement_supervisor

        if supervisor:

            Notification.objects.create(
                user=supervisor,
                message=f"{instance.student.email} submitted a weekly log."
            )