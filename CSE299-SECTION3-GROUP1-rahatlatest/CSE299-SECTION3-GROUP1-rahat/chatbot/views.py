from decimal import Decimal

import ollama

from django.contrib.auth import get_user_model
from django.db.models import (
    Count,
    DecimalField,
    ExpressionWrapper,
    F,
    Sum,
)
from django.utils import timezone
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView

from orders.models import Order, OrderItem
from store.models import Category, Product

from .serializers import ChatRequestSerializer


CUSTOMER_SYSTEM_PROMPT = """
You are the customer shopping assistant for BestCommerce.

You are given a current product catalogue from the BestCommerce database.

Rules:
- Answer product questions using only the supplied product catalogue.
- Tell customers the real product name, price, stock and category when available.
- Help customers choose between available products.
- Give short, clear and useful answers.
- If the customer asks generally what products are available, list the actual products.
- If a requested product is not in the catalogue, say it is not currently listed.
- Do not invent products, prices, stock or discounts.
- Do not reveal private customer, payment or order information.
- Do not claim that you added something to the cart or placed an order.
""".strip()


ADMIN_SYSTEM_PROMPT = """
You are the private admin assistant for BestCommerce.

Rules:
- Answer only from the database snapshot included with the admin's message.
- Give short, direct and useful business answers.
- Do not invent products, stock, customers, orders, revenue or dates.
- If the snapshot does not contain the requested information, say that clearly.
- You are read-only.
- Never claim that you changed, deleted or created database records.
- Never reveal passwords, authentication tokens or private security information.
""".strip()


SALES_VALUE_EXPRESSION = ExpressionWrapper(
    F("quantity") * F("price"),
    output_field=DecimalField(
        max_digits=14,
        decimal_places=2,
    ),
)


def build_customer_product_snapshot():
    products = list(
        Product.objects.filter(is_active=True)
        .select_related("category")
        .order_by("name")[:30]
    )

    if not products:
        return "There are currently no active products in the database."

    product_lines = []

    for product in products:
        description = product.description or "No description available"

        product_lines.append(
            "\n".join(
                [
                    f"Product: {product.name}",
                    f"Category: {product.category.name}",
                    f"Price: {product.price}",
                    f"Stock: {product.stock}",
                    f"Description: {description}",
                ]
            )
        )

    return "\n\n".join(product_lines)


def build_admin_database_snapshot():
    today = timezone.localdate()
    User = get_user_model()

    total_products = Product.objects.count()
    active_products = Product.objects.filter(
        is_active=True
    ).count()
    total_categories = Category.objects.count()
    total_users = User.objects.count()
    total_customers = User.objects.filter(
        is_customer=True
    ).count()

    low_stock_products = list(
        Product.objects.filter(
            is_active=True,
            stock__lte=10,
        )
        .select_related("category")
        .order_by("stock", "name")[:10]
    )

    product_catalog = list(
        Product.objects.select_related("category")
        .order_by("name")[:20]
    )

    total_orders = Order.objects.count()

    orders_today = Order.objects.filter(
        created_at__date=today
    ).count()

    status_rows = (
        Order.objects.values("status")
        .annotate(total=Count("id"))
        .order_by("status")
    )

    order_status_counts = {
        row["status"]: row["total"]
        for row in status_rows
    }

    latest_orders = list(
        Order.objects.select_related("user")
        .prefetch_related("items")
        .order_by("-created_at")[:5]
    )

    top_sellers = list(
        OrderItem.objects.values("product__name")
        .annotate(
            units_sold=Sum("quantity"),
            sales_value=Sum(
                SALES_VALUE_EXPRESSION
            ),
        )
        .order_by(
            "-units_sold",
            "product__name",
        )[:5]
    )

    recorded_sales_value = (
        OrderItem.objects.filter(
            order__status__in=[
                "paid",
                "shipped",
                "delivered",
            ]
        ).aggregate(
            total=Sum(
                SALES_VALUE_EXPRESSION
            )
        )["total"]
        or Decimal("0.00")
    )

    low_stock_lines = [
        (
            f"- {product.name}: "
            f"stock {product.stock}, "
            f"category {product.category.name}"
        )
        for product in low_stock_products
    ] or ["- None"]

    catalog_lines = [
        (
            f"- {product.name}: "
            f"price {product.price}, "
            f"stock {product.stock}, "
            f"category {product.category.name}, "
            f"active {product.is_active}"
        )
        for product in product_catalog
    ] or ["- No products"]

    latest_order_lines = [
        (
            f"- {order.order_number}: "
            f"status {order.status}, "
            f"payment status {order.payment_status}, "
            f"customer {order.user.username}, "
            f"total {order.total_amount}, "
            f"created {order.created_at.isoformat()}"
        )
        for order in latest_orders
    ] or ["- No orders"]

    top_seller_lines = [
        (
            f"- {row['product__name']}: "
            f"{row['units_sold']} units, "
            f"item sales value "
            f"{row['sales_value'] or Decimal('0.00')}"
        )
        for row in top_sellers
    ] or ["- No order-item sales recorded"]

    return "\n".join(
        [
            f"Snapshot date: {today.isoformat()}",
            f"Total products: {total_products}",
            f"Active products: {active_products}",
            f"Total categories: {total_categories}",
            f"Total users: {total_users}",
            (
                "Customers marked as customers: "
                f"{total_customers}"
            ),
            f"Total orders: {total_orders}",
            f"Orders today: {orders_today}",
            (
                "Order status counts: "
                f"{order_status_counts}"
            ),
            (
                "Recorded item sales value for "
                "paid, shipped or delivered orders: "
                f"{recorded_sales_value}"
            ),
            "Low-stock products with stock 10 or below:",
            *low_stock_lines,
            "Product catalogue, maximum 20 products:",
            *catalog_lines,
            "Latest orders, maximum 5:",
            *latest_order_lines,
            (
                "Top-selling products by recorded "
                "order-item quantity, maximum 5:"
            ),
            *top_seller_lines,
        ]
    )


class CustomerChatView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        serializer = ChatRequestSerializer(
            data=request.data
        )
        serializer.is_valid(
            raise_exception=True
        )

        message = serializer.validated_data[
            "message"
        ]

        try:
            product_snapshot = (
                build_customer_product_snapshot()
            )

            ai_response = ollama.chat(
                model="phi3:mini",
                messages=[
                    {
                        "role": "system",
                        "content": CUSTOMER_SYSTEM_PROMPT,
                    },
                    {
                        "role": "user",
                        "content": (
                            f"CUSTOMER QUESTION:\n"
                            f"{message}\n\n"
                            "CURRENT BESTCOMMERCE "
                            "PRODUCT CATALOGUE:\n"
                            f"{product_snapshot}"
                        ),
                    },
                ],
            )

            reply = (
                ai_response.message.content.strip()
            )

            return Response(
                {
                    "user_message": message,
                    "reply": reply,
                },
                status=status.HTTP_200_OK,
            )

        except Exception as error:
            return Response(
                {
                    "error": (
                        "The AI chatbot is "
                        "currently unavailable."
                    ),
                    "details": str(error),
                },
                status=(
                    status.HTTP_503_SERVICE_UNAVAILABLE
                ),
            )


class AdminChatView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        serializer = ChatRequestSerializer(
            data=request.data
        )
        serializer.is_valid(
            raise_exception=True
        )

        message = serializer.validated_data[
            "message"
        ]

        try:
            database_snapshot = (
                build_admin_database_snapshot()
            )

            ai_response = ollama.chat(
                model="phi3:mini",
                messages=[
                    {
                        "role": "system",
                        "content": ADMIN_SYSTEM_PROMPT,
                    },
                    {
                        "role": "user",
                        "content": (
                            f"ADMIN QUESTION:\n"
                            f"{message}\n\n"
                            "CURRENT DATABASE SNAPSHOT:\n"
                            f"{database_snapshot}"
                        ),
                    },
                ],
            )

            reply = (
                ai_response.message.content.strip()
            )

            return Response(
                {
                    "admin": request.user.username,
                    "user_message": message,
                    "reply": reply,
                },
                status=status.HTTP_200_OK,
            )

        except Exception as error:
            return Response(
                {
                    "error": (
                        "The admin chatbot is "
                        "currently unavailable."
                    ),
                    "details": str(error),
                },
                status=(
                    status.HTTP_503_SERVICE_UNAVAILABLE
                ),
            )