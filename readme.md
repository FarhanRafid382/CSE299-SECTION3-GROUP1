# BestCommerce Update Report

**Branch:** `FarhanRafid`  
**Update date:** 26 July 2026  
**Project:** AI-Powered E-Commerce Platform with Customer and Admin Chatbots

## 1. Purpose of This Update

This update combines Rahat's latest Django backend and Shakib's latest React frontend, then adds two working AI chatbots using the same local Ollama model:

- **Customer AI Chatbot** for product and shopping questions.
- **Admin AI Chatbot** for protected business and database questions.

Both chatbots use `phi3:mini` through Ollama, but they have different permissions, instructions and database access.

---

## 2. Rahat Backend: Latest ZIP Compared with the Previous Backend ZIP

### Summary

- **Files added:** 6
- **Files modified:** 5
- **Files removed:** 0
- **Major new backend features:** None

### Files added by Rahat

- `accounts/migrations/0002_alter_user_username.py`
  - Changes the username maximum length from 120 to 150 characters.
- `.idea/.gitignore`
- `.idea/ecommerse.iml`
- `.idea/misc.xml`
- `.idea/modules.xml`
- `.idea/vcs.xml`
  - These are local PyCharm/IntelliJ settings and do not add website functionality.

### Files modified by Rahat

- `accounts/views.py`
  - Only explanatory comments were added. The working code did not change.
- `backend/settings.py`
  - Added `STATIC_ROOT` for collected static files.
- `readme_rahat.txt`
  - Added notes about permissions, URLs and views.
- `venv/pyvenv.cfg`
  - Changed Rahat's local virtual-environment path.
- `db.sqlite3`
  - Username length migration was applied.
  - Added a sample category named `monitor`.
  - Added a sample product named `dell` with price `50000` and stock `100`.

### Important finding

Rahat's latest backend already used Django REST Framework for its normal database views. However, it did **not** include the working Ollama customer chatbot endpoint.

---

## 3. Shakib Frontend: Latest ZIP Compared with the Previous Frontend ZIP

### Summary

- **Files added:** 0
- **Files modified:** 15
- **Files removed:** 0
- **Dependencies changed:** No

### Files modified by Shakib

- `src/App.jsx`
  - Removed temporary App-level cart and order state.
- `src/components/Navbar.jsx`
  - Added token-based login detection and logout.
- `src/pages/Cart.jsx`
  - Added backend cart loading and item deletion.
- `src/pages/CategoryDetail.jsx`
  - Added category-product API loading and add-to-cart requests.
- `src/pages/CategoryList.jsx`
  - Added category loading from the backend.
- `src/pages/Chat.jsx`
  - Kept the customer chatbot API call to `/api/ai/chat/` and improved the page design.
- `src/pages/Checkout.jsx`
  - Added backend cart loading and order creation.
- `src/pages/Login.jsx`
  - Added real JWT login and token storage. This page was updated, not newly created.
- `src/pages/NotFound.jsx`
  - Redesigned the 404 page.
- `src/pages/OrderDetails.jsx`
  - Added backend loading for a single order.
- `src/pages/OrderHistory.jsx`
  - Added backend loading for order history.
- `src/pages/ProductDetail.jsx`
  - Added backend loading and add-to-cart requests.
- `src/pages/Products.jsx`
  - Added product API loading, searching and add-to-cart requests.
- `src/pages/Profile.jsx`
  - Redesigned the page, but profile saving is still not connected to the backend.
- `src/pages/Register.jsx`
  - Added registration API submission and redirect to login.

### Important finding

Shakib kept the frontend request to:

```text
http://127.0.0.1:8000/api/ai/chat/
```

The missing part was Rahat's backend endpoint that should answer this request.

---

## 4. Work Added in This Update

## Backend additions

A separate Django app named `chatbot` was added. Rahat's existing `chat` app was not removed or overwritten.

### Meaningful new files

- `chatbot/serializers.py`
  - Checks that a non-empty message is received.
- `chatbot/urls.py`
  - Adds separate customer and admin chatbot routes.
- `chatbot/views.py`
  - Contains both Ollama chatbot endpoints and database snapshot logic.

### Django-generated support files

- `chatbot/__init__.py`
- `chatbot/admin.py`
- `chatbot/apps.py`
- `chatbot/models.py`
- `chatbot/tests.py`
- `chatbot/migrations/__init__.py`

### Backend files changed

- `backend/settings.py`
  - Added `chatbot` to `INSTALLED_APPS`.
- `backend/urls.py`
  - Added the `/api/ai/` route.
- `requirements.txt`
  - Added the Ollama Python package.

---

## 5. Customer AI Chatbot

### Frontend page

```text
/chat
```

### Backend endpoint

```text
POST /api/ai/chat/
```

### Access

- Public endpoint.
- No administrator login required.

### What it does

1. Receives the customer's message from React.
2. Reads current active products from SQLite.
3. Builds a safe product catalogue containing product name, category, price, stock and description.
4. Sends the customer question and product catalogue to `phi3:mini` through Ollama.
5. Returns the generated reply to the frontend.

### What it cannot access

- Customer accounts
- Passwords or tokens
- Private order information
- Payment information
- Admin-only business data

### Frontend improvements

`src/pages/Chat.jsx` was updated to include:

- Loading state
- Disabled input while waiting
- Disabled send button for empty input
- Proper handling of failed backend responses
- Clear error messages
- Multi-line reply display

---

## 6. Admin AI Chatbot

### Frontend page

```text
/admin-chat
```

### Backend endpoint

```text
POST /api/ai/admin-chat/
```

### Access

- Requires a valid JWT access token.
- Requires a Django staff or superuser account.
- Normal customers are denied access.

### What it can read

- Total products
- Active products
- Categories
- Product prices and stock
- Low-stock products
- Total users and customers
- Total orders
- Orders created today
- Order status counts
- Latest orders
- Recorded sales value
- Top-selling products based on recorded order items

### Safety rules

- Read-only access
- Cannot create, update or delete records
- Cannot reveal passwords or authentication tokens
- Answers only from the database snapshot supplied by Django

### Frontend additions

- Added `src/pages/AdminChat.jsx`.
- Added `/admin-chat` route in `src/App.jsx`.
- Added an Admin AI link in `src/components/Navbar.jsx`.
- Added sample question buttons for common admin queries.
- Added clear messages for expired login, missing login and non-admin access.

---

## 7. Final API Flow

### Customer chatbot

```text
Customer message
    -> React Chat page
    -> POST /api/ai/chat/
    -> Django REST Framework
    -> Current active product data from SQLite
    -> Ollama phi3:mini
    -> Reply returned to React
```

### Admin chatbot

```text
Admin login
    -> JWT access token
    -> React Admin Chat page
    -> POST /api/ai/admin-chat/ with token
    -> Django checks staff/admin permission
    -> Business data read from SQLite
    -> Ollama phi3:mini
    -> Reply returned to React
```

---

## 8. Other Files Added

- `Start-BestCommerce.bat`
  - Starts Django and React automatically in separate terminal windows.
  - Opens the website without manually typing both startup commands.
- `partsChanged.md`
  - Documents the complete update.
- Root `.gitignore`
  - Prevents temporary, local and sensitive files from being committed.

### Excluded from GitHub

- `.venv/`
- `venv/`
- `node_modules/`
- `__pycache__/`
- `*.pyc`
- `.idea/`
- ZIP backup files
- `.DS_Store`
- `superuser.txt`

`superuser.txt` is excluded because login credentials must not be published.

---

## 9. Files Added, Changed and Removed by This Integration

### Added

- Entire `chatbot/` backend app
- `src/pages/AdminChat.jsx`
- `Start-BestCommerce.bat`
- Root `.gitignore`
- This update report

### Changed

- `backend/settings.py`
- `backend/urls.py`
- `requirements.txt`
- `src/pages/Chat.jsx`
- `src/App.jsx`
- `src/components/Navbar.jsx`

### Removed

- No Rahat or Shakib application source file was intentionally removed from their latest folders.
- Old files from the previous `FarhanRafid` branch version were replaced when the branch was updated with the new `BestCommerce` folder.

---

## 10. Testing Completed

The following were tested successfully:

- Django system check
- Customer chatbot backend endpoint through PowerShell
- Customer chatbot through the React page
- Customer chatbot reading real products from SQLite
- Admin JWT login
- Admin chatbot backend endpoint
- Admin chatbot through the React page
- Admin-only protection
- Rejection of requests without an admin token
- Both chatbots using the same `phi3:mini` model
- One-click backend and frontend startup

---

## 11. Current Limitations

- Both chatbots require Ollama to be installed and running locally.
- The `phi3:mini` model must already be downloaded.
- The admin chatbot is read-only.
- The customer chatbot does not access private order or account information.
- The frontend still contains some API assumptions that may need further backend matching.
- The profile page design exists, but profile updates are not yet saved to the backend.
- The chatbots do not yet store complete AI conversations in Rahat's existing chat tables.

---

## 12. Main Result

The latest Rahat backend and Shakib frontend are now connected to two separate working AI interfaces:

1. A public customer shopping assistant that answers using current product data.
2. A protected admin business assistant that answers using current store and order data.

Both use the same local `phi3:mini` model through Ollama and communicate with React through Django REST Framework APIs.
