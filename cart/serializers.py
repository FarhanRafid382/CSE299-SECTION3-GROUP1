from rest_framework import serializers

from store.serializers import ProductSerializer

from .models import Cart, CartItem


class CartItemSerializer(serializers.ModelSerializer):
    product_detail = ProductSerializer(source='product', read_only=True)

    class Meta:
        model = CartItem
        fields = [
            'id',
            'cart',
            'product',
            'product_detail',
            'quantity',
            'price_at_add',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['price_at_add', 'created_at', 'updated_at']


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'session_id', 'items', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']
