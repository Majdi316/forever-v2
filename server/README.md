# 🛒 Forever-V2 — Backend API

A **scalable Node.js backend** for a modern e-commerce platform, featuring **secure authentication**, **role-based access control**, **email verification**, **payments**, and **advanced admin analytics**.

---

## 📌 Overview

This server powers an e-commerce system that supports:

- Secure user authentication & authorization
- Email verification and password recovery
- Role-based permissions (Visitor, User, Employee, Manager)
- Product management & ordering system
- Stripe payments & Cash on Delivery
- Reviews, likes, and direct messaging
- Admin analytics with exportable reports (PDF / Excel)

---

## 🧱 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js (v5)
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT
- **Validation:** Joi
- **Email Service:** Resend
- **Payments:** Stripe
- **Security & Utilities:**
  - bcrypt / bcryptjs
  - express-rate-limit
  - cookie-parser
  - cors
  - dotenv
  - lodash
  - chalk
  - morgan

---

## 📂 Project Structure

```txt
server/
├── controllers/
├── routes/
├── models/
├── middlewares/
├── services/
├── helpers/
├── config/
├── server.js
└── .env
```
---

## 🔐 Authentication & Authorization

- JWT-based authentication
- Role-based access control (RBAC)
- Email verification using a one-time code
- Password reset via time-limited token
- Rate-limited authentication endpoints

---

## 👥 User Roles & Permissions

### 👀 Visitor
Unauthenticated or newly registered users.

**Permissions:**
- Register with a real email address
- Verify email using a one-time code
- View products and product details
- View personal profile data

---

### 👤 User (Customer)
Verified and authenticated users.

**Permissions:**
- Login and Logout
- Reset forgotten password via email token
- Add products to cart
- Place orders using:
  - Cash on Delivery
  - Visa card (Stripe)
- Like products
- Add and manage reviews
- Contact the manager directly
- Update profile information
- Track order status

---

### 🧑‍💼 Employee
Operational role for product management.

**Permissions:**
- Add new products
- Edit product details
- Upload additional product images
- Update product availability (e.g., Sold Out)

---

### 🛡️ Manager (Admin)
Full system control and analytics.

**Permissions:**
- Block or delete non-manager accounts
- Manage all orders
- Delete sold-out products
- Moderate reviews (remove inappropriate content)
- Reply to user messages
- View platform analytics:
  - Total users
  - Total products
  - Total orders
  - Total earnings
  - Likes statistics
- View earnings by month and year (charts)
- Export reports in:
  - PDF
  - Excel

  ---

## 💳 Payments

- Stripe Visa payments
- Cash on Delivery
- Secure server-side payment handling
- Order status tracking

---

## 📧 Email Services

- Email verification after registration
- Password reset token delivery
- Powered by **Resend API**

---

## 📊 Analytics & Reports

- Monthly and yearly earnings
- Orders and product statistics
- Likes and user activity metrics
- Exportable admin reports:
  - PDF
  - Excel

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000

# MongoDB
ATLAS_DB=mongodb+srv://<user>:<password>@cluster.mongodb.net/final-project-v2
LOCAL_DB=mongodb://127.0.0.1:27017/forever-v2

# Authentication
JWT_SECRET=your_jwt_secret

# Email
RESEND_API_KEY=your_resend_api_key

# Client
CLIENT_URL=http://localhost:5173

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
```

> ⚠️ **Never commit `.env` files to version control.**

---

## 🚀 Installation & Running

### Install dependencies
```bash
npm install
```

### Development mode
```bash
npm run dev
```

### Production mode
```bash
npm start
```

---

## 🔒 Security Features

- Password hashing (bcrypt)
- JWT authentication
- Rate limiting
- Input validation
- Secure cookies and CORS
- Environment-based configuration

---

## 📈 Architecture & Scalability

- Modular controller–service architecture
- Clean separation of concerns
- Extendable role-based permission system
- Production-ready backend structure

---

## 🧑‍💻 Author

**Majdi Hoseen**  
Backend Developer
