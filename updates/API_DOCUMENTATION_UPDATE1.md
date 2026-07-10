# API Documentation

## Project
AI-Powered E-Commerce Platform with Intelligent Business Insights

---

# Base URL

```
/api
```

---

# Authentication APIs

## Register User

**Endpoint**

```
POST /api/register
```

### Description

Creates a new customer account.

### Request Body

```json
{
  "full_name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Success Response

```json
{
  "message": "User registered successfully."
}
```

---

## Login

**Endpoint**

```
POST /api/login
```

### Description

Authenticates a user and starts a session.

### Request Body

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Success Response

```json
{
  "message": "Login successful",
  "token": "JWT_TOKEN"
}
```

---

## Logout

**Endpoint**

```
POST /api/logout
```

### Description

Logs out the currently authenticated user.

### Success Response

```json
{
  "message": "Logout successful"
}
```

---

# Product APIs

## Get All Products

**Endpoint**

```
GET /api/products
```

### Description

Returns all available products.

### Success Response

```json
[
  {
    "id": 1,
    "name": "Gaming Mouse",
    "price": 1200,
    "stock": 15,
    "category": "Accessories"
  }
]
```

---

## Get Product by ID

**Endpoint**

```
GET /api/products/{id}
```

### Description

Returns details of a single product.

### Success Response

```json
{
  "id": 1,
  "name": "Gaming Mouse",
  "price": 1200,
  "stock": 15,
  "category": "Accessories"
}
```

---

## Create Product

**Endpoint**

```
POST /api/products
```

### Description

Creates a new product.

### Request Body

```json
{
  "name": "Mechanical Keyboard",
  "price": 3500,
  "stock": 10,
  "category": "Accessories"
}
```

### Success Response

```json
{
  "message": "Product created successfully."
}
```

---

## Update Product

**Endpoint**

```
PUT /api/products/{id}
```

### Description

Updates an existing product.

### Request Body

```json
{
  "price": 3300,
  "stock": 20
}
```

### Success Response

```json
{
  "message": "Product updated successfully."
}
```

---

## Delete Product

**Endpoint**

```
DELETE /api/products/{id}
```

### Description

Deletes a product.

### Success Response

```json
{
  "message": "Product deleted successfully."
}
```

---

# Category APIs

## Get Categories

**Endpoint**

```
GET /api/categories
```

### Description

Returns all product categories.

### Success Response

```json
[
  {
    "id": 1,
    "name": "Accessories"
  }
]
```

---

# Cart APIs

## Get Cart

**Endpoint**

```
GET /api/cart
```

### Description

Returns all products currently in the user's cart.

### Success Response

```json
[
  {
    "product_id": 1,
    "quantity": 2
  }
]
```

---

## Add Item to Cart

**Endpoint**

```
POST /api/cart
```

### Request Body

```json
{
  "product_id": 1,
  "quantity": 2
}
```

### Success Response

```json
{
  "message": "Item added to cart."
}
```

---

## Remove Item from Cart

**Endpoint**

```
DELETE /api/cart/{product_id}
```

### Success Response

```json
{
  "message": "Item removed from cart."
}
```

---

# Order APIs

## Checkout

**Endpoint**

```
POST /api/orders
```

### Description

Creates a new order from the user's shopping cart.

### Success Response

```json
{
  "order_id": 101,
  "status": "Pending"
}
```

---

## Get User Orders

**Endpoint**

```
GET /api/orders
```

### Description

Returns all orders placed by the logged-in user.

### Success Response

```json
[
  {
    "order_id": 101,
    "status": "Completed",
    "total": 4500
  }
]
```

---

## Get Order Details

**Endpoint**

```
GET /api/orders/{id}
```

### Description

Returns detailed information for a specific order.

---

# Inventory APIs

## Get Inventory

**Endpoint**

```
GET /api/inventory
```

### Description

Returns inventory information for all products.

### Success Response

```json
[
  {
    "product_id": 1,
    "stock": 15
  }
]
```

---

## Update Inventory

**Endpoint**

```
PUT /api/inventory/{product_id}
```

### Request Body

```json
{
  "stock": 30
}
```

### Success Response

```json
{
  "message": "Inventory updated successfully."
}
```

---

# AI Customer Chat APIs

## Send Customer Message

**Endpoint**

```
POST /api/chat/customer
```

### Description

Sends a customer message to the AI chatbot.

### Request Body

```json
{
  "message": "Show me gaming keyboards."
}
```

### Success Response

```json
{
  "reply": "Here are our available gaming keyboards."
}
```

---

## Human Takeover

**Endpoint**

```
POST /api/chat/handover
```

### Description

Transfers the customer conversation to a human support representative.

### Success Response

```json
{
  "message": "Conversation transferred successfully."
}
```

---

# AI Admin APIs

## Ask Admin AI

**Endpoint**

```
POST /api/admin/chat
```

### Description

Allows administrators to ask business-related questions using natural language.

### Request Body

```json
{
  "question": "Which products are low in stock?"
}
```

### Success Response

```json
{
  "answer": "Gaming Mouse (5), Mechanical Keyboard (3)"
}
```

---

# Dashboard APIs

## Dashboard Statistics

**Endpoint**

```
GET /api/admin/dashboard
```

### Description

Returns dashboard statistics for administrators.

### Success Response

```json
{
  "total_users": 230,
  "total_orders": 510,
  "total_products": 75,
  "low_stock_products": 6
}
```

---

# Invoice APIs

## Generate Invoice

**Endpoint**

```
GET /api/orders/{id}/invoice
```

### Description

Generates a PDF invoice for a completed order.

### Success Response

Returns a downloadable PDF invoice.

---

# HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Resource Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Resource Not Found |
| 500 | Internal Server Error |