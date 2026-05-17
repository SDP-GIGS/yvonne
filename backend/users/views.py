from rest_framework import viewsets
from .models import CustomUser, SupervisorApplication
from .serializers import UserSerializer, SupervisorApplicationSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from .serializers import MyTOkenObtainPairSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from .permissions import IsInternshipAdministrator



class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):

        # if the user isnt logged in return nothing
        user = self.request.user
        if not user.is_authenticated:
            return CustomUser.objects.none()

        # RBAC: Only Admins see everyone. Others see only themselves.
        # if self.request.user.role == 'ADMIN':
        # lets try something so that by mistake the user role is not in the system does not crash
        if getattr(user, "role", None) == "ADMIN":
            return CustomUser.objects.all()

        if getattr(user, "role", None) == 'WORK_SUPERVISOR':
            from placements.models import InternshipPlacement
            student_ids = InternshipPlacement.objects.filter(
                workplace_supervisor=user
            ).values_list('student_id', flat=True)
            return CustomUser.objects.filter(id__in=student_ids)

        if getattr(user, "role", None) == 'ACADEMIC_SUPERVISOR':
            from placements.models import InternshipPlacement
            student_ids = InternshipPlacement.objects.filter(
                academic_supervisor=user
            ).values_list('student_id', flat=True)
            return CustomUser.objects.filter(id__in=student_ids)

        return CustomUser.objects.filter(id=self.request.user.id)

    def get_permissions(self):
        # Business Logic: Anyone can register, but only Admin can delete users.
        if self.action == "create":
            return [AllowAny()]
        if self.action == "destroy":
            return [IsInternshipAdministrator()]
        return [IsAuthenticated()]

    @action(detail=False, methods=["get"])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

    @action(detail=False, methods=["post"])
    def change_password(self, request):
        user = request.user
        old_password = request.data.get("old_password")
        new_password = request.data.get("new_password")

        if not old_password or not new_password:
            return Response(
                {"detail": "Both old_password and new_password are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not user.check_password(old_password):
            return Response(
                {"detail": "Wrong old password."}, status=status.HTTP_400_BAD_REQUEST
            )

        user.set_password(new_password)
        user.save()
        return Response(
            {"detail": "Password updated successfully."}, status=status.HTTP_200_OK
        )

    # now also instead of deleting a record it can be activate so to keep the history of such a record
    @action(
        detail=True, methods=["post"], permission_classes=[IsInternshipAdministrator]
    )
    def deactivate(self, request, pk=None):
        user = self.get_object()

        if not user.is_active:
            return Response(
                {"message": f"User {user.email} is already deactivated."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user.is_active = False
        user.save()
        return Response(
            {"message": f"User {user.email} has been deactivated."},
            status=status.HTTP_200_OK,
        )


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTOkenObtainPairSerializer


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(
                {"detail": "Successfully logged out."},
                status=status.HTTP_205_RESET_CONTENT,
            )
        except Exception as e:
            return Response(
                {"detail": f"Invalid token or token already blacklisted {e}."},
                status=status.HTTP_400_BAD_REQUEST,
            )


class SupervisorApplicationViewSet(viewsets.ModelViewSet):
    queryset = SupervisorApplication.objects.all()
    serializer_class = SupervisorApplicationSerializer
    permission_classes = [IsAuthenticated, IsInternshipAdministrator]

    @action(detail=True, methods=["post"])
    def approve(self, request, pk=None):
        application = self.get_object()
        if application.status == "PENDING":
            application.status = "APPROVED"
            application.save()

            # Activate the user
            user = application.user
            user.is_active = True
            user.save()

            return Response(
                {"detail": "Application approved and user activated."},
                status=status.HTTP_200_OK,
            )
        return Response(
            {"detail": f"Application is already {application.status}."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    @action(detail=True, methods=["post"])
    def reject(self, request, pk=None):
        application = self.get_object()
        if application.status == "PENDING":
            application.status = "REJECTED"
            application.save()
            return Response(
                {"detail": "Application rejected."}, status=status.HTTP_200_OK
            )
        return Response(
            {"detail": f"Application is already {application.status}."},
            status=status.HTTP_400_BAD_REQUEST,
        )


# Create your views here.