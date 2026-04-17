from rest_framework import permissions
class SupervisorOrStudent(permissions.BasePermission):
    def has_permission(self, request, view):
 #ALLOW ONLY LOGGED IN TO SEE OR READ
       if request.method in permissions.SAFE_METHODS:#(GET,POST,HEAD)
           return True
       
       #only allow students to create logs
       if request.method=="POST":
           return request.user.role=="STUDENT"
       return True