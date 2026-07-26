from rest_framework import viewsets, permissions
from backend.permissions import IsSupportAgentUser
from .models import Category, Product, Inventory
from .serializers import CategorySerializer, ProductSerializer, InventorySerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class InventoryViewSet(viewsets.ModelViewSet):
    queryset = Inventory.objects.all()
    serializer_class = InventorySerializer
    permission_classes = [permissions.IsAuthenticated, IsSupportAgentUser]

    def perform_create(self, serializer):
        # Automatically assign the logged-in support agent/admin
        serializer.save(created_by_id=self.request.user)