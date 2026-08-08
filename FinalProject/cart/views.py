from rest_framework import viewsets, permissions
from backend.permissions import IsOwnerOrStaff
from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer

class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrStaff]

    def get_queryset(self):
        return Cart.objects.filter(user_id=self.request.user)

class CartItemViewSet(viewsets.ModelViewSet):
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrStaff]

    def get_queryset(self):
        # Filter items that are only inside the logged-in user's cart
        return CartItem.objects.filter(cart__user_id=self.request.user)