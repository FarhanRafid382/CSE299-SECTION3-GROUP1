from rest_framework import permissions, viewsets

from backend.permissions import IsSupportAgentUser

from .models import Category, Inventory, Product
from .serializers import (
    CategorySerializer,
    InventorySerializer,
    ProductSerializer,
    PublicProductSerializer,
)


class AdminWritePublicReadPermission(permissions.BasePermission):
    """
    Anyone may view public store data.
    Only administrators may create, update or delete it.
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.is_staff
        )


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer
    permission_classes = [AdminWritePublicReadPermission]


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.filter(is_active=True)
    permission_classes = [AdminWritePublicReadPermission]

    def get_serializer_class(self):
        user = self.request.user

        if (
            user
            and user.is_authenticated
            and user.is_staff
        ):
            return ProductSerializer

        return PublicProductSerializer


class InventoryViewSet(viewsets.ModelViewSet):
    queryset = Inventory.objects.all()
    serializer_class = InventorySerializer
    permission_classes = [
        permissions.IsAuthenticated,
        IsSupportAgentUser,
    ]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)