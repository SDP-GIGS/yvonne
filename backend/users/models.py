from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager, PermissionsMixin


class UserManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("The Email must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)
        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractUser, PermissionsMixin):
    STUDENT = "STUDENT"
    WORK_SUPERVISOR = "WORK_SUPERVISOR"
    ACADEMIC_SUPERVISOR = "ACADEMIC_SUPERVISOR"
    ADMIN = "ADMIN"

    ROLE_CHOICES = (
        (STUDENT, "Student"),
        (WORK_SUPERVISOR, "Workplace Supervisor"),
        (ACADEMIC_SUPERVISOR, "Academic Supervisor"),
        ("ADMIN", "Internship Administrator"),
    )

    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="STUDENT")
    phone_number = models.CharField(max_length=15, blank=True)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    student_number = models.BigIntegerField(null=True, blank=True)
    intake_year = models.IntegerField(null=True, blank=True)
    year_of_study = models.IntegerField(null=True, blank=True)
    programme_id = models.CharField(max_length=255, null=True, blank=True)
    programme_name = models.CharField(max_length=255, null=True, blank=True)
    # department = models.CharField(max_length=255,null=True,blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects: "UserManager" = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name", "role"]

    def __str__(self):
        return f"{self.email} ({self.role})"


class StaffProfile(models.Model):
    user = models.OneToOneField(
        CustomUser,
        on_delete=models.CASCADE,
    )
    staff_number = models.CharField(
        max_length=255,
    )
    department = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.staff_number} ({self.user.email})"


class SupervisorApplication(models.Model):
    STATUS_CHOICES = (
        ("PENDING", "Pending"),
        ("APPROVED", "Approved"),
        ("REJECTED", "Rejected"),
    )
    user = models.OneToOneField(
        CustomUser,
        on_delete=models.CASCADE,
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="PENDING")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.email} ({self.status})"


# Create your models here.
