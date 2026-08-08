from rest_framework import serializers

from .models import Category, Product, ProductImage, Inventory


class CategorySerializer(serializers.ModelSerializer):
    parent = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        allow_null=True,
        required=False,
    )
    subcategories = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    products = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Category
        fields = [
            'id',
            'name',
            'slug',
            'description',
            'parent',
            'subcategories',
            'products',
            'image',
            'is_active',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['created_at', 'updated_at']


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'product', 'image', 'created_at']
        read_only_fields = ['created_at']


class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = ['id', 'product', 'quantity_change', 'reason', 'note', 'created_by', 'created_at']
        read_only_fields = ['created_by', 'created_at']


class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    inventory_logs = InventorySerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            'id',
            'category',
            'name',
            'slug',
            'description',
            'price',
            'compare_price',
            'stock',
            'image',
            'is_active',
            'is_featured',
            'views',
            'images',
            'inventory_logs',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['views', 'created_at', 'updated_at']
