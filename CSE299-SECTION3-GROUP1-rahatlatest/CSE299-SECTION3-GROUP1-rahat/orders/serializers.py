from rest_framework import serializers

from store.serializers import ProductSerializer

from .models import Invoice, Order, OrderItem, Payment


class OrderItemSerializer(serializers.ModelSerializer):
    product_detail = ProductSerializer(source='product', read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'order', 'product', 'product_detail', 'quantity', 'price', 'total', 'created_at']
        read_only_fields = ['total', 'created_at']


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['order', 'amount', 'payment_method', 'transaction_id', 'status', 'payment_date', 'updated_at']
        read_only_fields = ['payment_date', 'updated_at']


class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        fields = ['order', 'invoice_number', 'pdf_file', 'generated_at']
        read_only_fields = ['generated_at']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    subtotal = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    shipping_cost = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    total_amount = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = Order
        fields = [
            'id',
            'user',
            'order_number',
            'status',
            'subtotal',
            'shipping_cost',
            'tax',
            'discount',
            'total_amount',
            'shipping_address',
            'billing_address',
            'payment_method',
            'payment_status',
            'notes',
            'items',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['created_at', 'updated_at', 'subtotal', 'shipping_cost', 'total_amount']
