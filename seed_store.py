import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from store.models import Category, Product, Inventory
from django.contrib.auth import get_user_model

User = get_user_model()


def seed_store():
    Category.objects.all().delete()
    Product.objects.all().delete()
    Inventory.objects.all().delete()

    categories = [
        {
            'name': 'Electronics',
            'slug': 'electronics',
            'description': 'Latest gadgets and smart devices.',
            'is_active': True,
        },
        {
            'name': 'Fashion',
            'slug': 'fashion',
            'description': 'Trendy clothing and accessories.',
            'is_active': True,
        },
        {
            'name': 'Home & Living',
            'slug': 'home-living',
            'description': 'Furniture and home essentials.',
            'is_active': True,
        },
        {
            'name': 'Sports',
            'slug': 'sports',
            'description': 'Performance gear and outdoor essentials.',
            'is_active': True,
        },
    ]

    created_categories = []
    for data in categories:
        category, _ = Category.objects.get_or_create(slug=data['slug'], defaults=data)
        created_categories.append(category)

    products = [
        {
            'category': 'Electronics',
            'name': 'Wireless Earbuds',
            'slug': 'wireless-earbuds',
            'description': 'Noise-cancelling earbuds with 24-hour battery life.',
            'price': '4990.00',
            'compare_price': '5990.00',
            'stock': 25,
            'is_active': True,
            'is_featured': True,
        },
        {
            'category': 'Electronics',
            'name': 'Smart Watch',
            'slug': 'smart-watch',
            'description': 'Track your health and stay connected everywhere.',
            'price': '7590.00',
            'compare_price': '8990.00',
            'stock': 18,
            'is_active': True,
            'is_featured': True,
        },
        {
            'category': 'Fashion',
            'name': 'Classic Denim Jacket',
            'slug': 'classic-denim-jacket',
            'description': 'Comfortable denim jacket for everyday wear.',
            'price': '3290.00',
            'compare_price': '3990.00',
            'stock': 30,
            'is_active': True,
            'is_featured': False,
        },
        {
            'category': 'Fashion',
            'name': 'Leather Crossbody Bag',
            'slug': 'leather-crossbody-bag',
            'description': 'Premium leather bag with multiple compartments.',
            'price': '5890.00',
            'compare_price': '6990.00',
            'stock': 12,
            'is_active': True,
            'is_featured': True,
        },
        {
            'category': 'Home & Living',
            'name': 'Ergonomic Office Chair',
            'slug': 'ergonomic-office-chair',
            'description': 'Comfortable chair for work-from-home setups.',
            'price': '12990.00',
            'compare_price': '14990.00',
            'stock': 10,
            'is_active': True,
            'is_featured': False,
        },
        {
            'category': 'Home & Living',
            'name': 'Ambient Table Lamp',
            'slug': 'ambient-table-lamp',
            'description': 'Soft lighting with a modern minimalist design.',
            'price': '2490.00',
            'compare_price': '2990.00',
            'stock': 22,
            'is_active': True,
            'is_featured': False,
        },
        {
            'category': 'Sports',
            'name': 'Running Shoes',
            'slug': 'running-shoes',
            'description': 'Lightweight running shoes built for comfort.',
            'price': '4590.00',
            'compare_price': '5490.00',
            'stock': 20,
            'is_active': True,
            'is_featured': True,
        },
        {
            'category': 'Sports',
            'name': 'Yoga Mat',
            'slug': 'yoga-mat',
            'description': 'Non-slip yoga mat for home or studio use.',
            'price': '1890.00',
            'compare_price': '2290.00',
            'stock': 35,
            'is_active': True,
            'is_featured': False,
        },
    ]

    category_lookup = {category.name: category for category in created_categories}
    for data in products:
        category = category_lookup[data['category']]
        product, _ = Product.objects.get_or_create(slug=data['slug'], defaults={
            'category': category,
            'name': data['name'],
            'description': data['description'],
            'price': data['price'],
            'compare_price': data['compare_price'],
            'stock': data['stock'],
            'is_active': data['is_active'],
            'is_featured': data['is_featured'],
        })

        Inventory.objects.get_or_create(
            product=product,
            defaults={
                'quantity_change': data['stock'],
                'reason': 'Initial stock',
                'note': 'Seeded inventory',
                'created_by': None,
            },
        )

    print('Seeded categories and products successfully.')


if __name__ == '__main__':
    seed_store()
