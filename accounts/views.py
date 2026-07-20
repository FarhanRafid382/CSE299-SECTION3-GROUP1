from rest_framework import viewsets, permissions
from backend.permissions import IsOwnerOrStaff
from .models import Profile
from .serializers import ProfileSerializer

class ProfileViewSet(viewsets.ModelViewSet):
    '''ModelViewSet: By using this, Django automatically 
    creates 5 endpoints for you: listing profiles, viewing a 
    single profile, creating one, updating one, and deleting one.'''
    queryset = Profile.objects.all()
    '''queryset = Profile.objects.all(): This tells the view: 
    "When you need to look at the database, use the Profile table."
    '''
    serializer_class = ProfileSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated(), IsOwnerOrStaff()]