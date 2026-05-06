from rest_framework import permissions

from .models import CustomUser


class IsStudent(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == CustomUser.STUDENT


class IsAcademicSupervisor(permissions.BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.role == CustomUser.ACADEMIC_SUPERVISOR
        )
    


class IsWorkSupervisor(permissions.BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.role == CustomUser.WORK_SUPERVISOR
        )


class IsInternshipAdministrator(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == CustomUser.ADMIN


class IsAnySupervisor(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role in [
            CustomUser.ACADEMIC_SUPERVISOR,
            CustomUser.WORK_SUPERVISOR,
        ]
        # or request.user.role==CustomUser.WORK_SUPERVISOR


class IsAnySupervisorOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role in [
            CustomUser.ACADEMIC_SUPERVISOR,
            CustomUser.WORK_SUPERVISOR,
            CustomUser.ADMIN,
        ]


class IsOwnerOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # return True if user is admin
        if request.user.role == CustomUser.ADMIN:
            return True
        # return True if user is the object's owner
        return obj.user == request.user
