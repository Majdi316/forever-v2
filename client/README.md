# 🖥️ Forever-v2 Frontend — React & Vite

A **modern React frontend** for the Forever-v2 e-commerce platform, built with **Vite**, **Material-UI**, **Tailwind CSS**, and other supporting libraries.  
It integrates seamlessly with the backend API for authentication, product management, orders, payments, and analytics.

---

## 📌 Overview

This frontend provides:

- User-friendly interface for all roles (Visitor, User, Employee, Manager)
- Responsive UI with Tailwind CSS and Material-UI
- Interactive charts and reports
- PDF and Excel export for admin analytics
- Real-time notifications and toasts
- Secure authentication with JWT
- Integration with backend API

---

## 🧱 Tech Stack & Libraries

- **Framework:** React (v19)
- **Build Tool:** Vite
- **UI Libraries:**
  - Material-UI (`@mui/material`, `@mui/icons-material`)
  - Tailwind CSS (`tailwindcss`, `@tailwindcss/vite`)
  - Framer Motion (animations)
- **Data & API:**
  - Axios (API requests)
  - JWT-decode (decode tokens)
  - Moment (date formatting)
- **Charts & Analytics:**
  - Chart.js
  - react-chartjs-2
- **Export & File Handling:**
  - jspdf
  - html2canvas
  - file-saver
  - xlsx
- **Notifications & Effects:**
  - react-toastify
  - react-confetti
  - react-icons
  - lucide-react
- **Routing & Navigation:**
  - react-router-dom
- **Validation:**
  - joi

**Development Tools / DevDependencies:**

- Vite
- @vitejs/plugin-react
- ESLint, ESLint Plugins
- TypeScript type definitions (`@types/react`, `@types/react-dom`)

---

## 📂 Project Structure

```txt
frontend/
├── public/
├── src/
│   ├── api/
│   ├── components/
│   ├── pages/
│   ├── routes/
│   ├── context/
│   ├── hooks/
│   ├── utils/
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── .env
```

---

## 🔗 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_BACKEND_URL=http://localhost:3000
```

> ⚠️ Never commit `.env` files to version control.

---

## 🚀 Installation & Running

### 1️⃣ Install dependencies
```bash
npm install
```

### 2️⃣ Development mode
```bash
npm run dev
```

### 3️⃣ Production mode (build)
```bash
npm run build
```

### 4️⃣ Preview production build
```bash
npm run preview
```

---

## 🔐 Authentication & Authorization

- Connects to backend JWT authentication
- Role-based UI rendering for Visitor, User, Employee, Manager
- Email verification and password reset support
- Protected routes for secure areas (dashboard, admin panels)

---

## 👥 User Roles & Features

### 👀 Visitor
- Browse products
- Register and verify email
- View public product details

### 👤 User
- Login / Logout
- Add products to cart
- Place orders (Cash on Delivery or Stripe)
- Like products and add reviews
- Update profile
- Contact manager

### 🧑‍💼 Employee
- Add or edit products
- Upload product images
- Mark product availability

### 🛡️ Manager
- Manage users and orders
- Moderate reviews
- View analytics charts
- Export PDF / Excel reports

---

## 📊 Analytics & Reports

- Interactive charts with `react-chartjs-2`
- Monthly & yearly earnings visualization
- Order and product statistics
- Export functionality:
  - PDF (jspdf + html2canvas)
  - Excel (xlsx)

---

## 💻 UI & Interactivity

- Responsive UI (Material-UI + Tailwind)
- Smooth animations (Framer Motion)
- Notifications (react-toastify)
- Icons from `lucide-react` and `react-icons`

---

## 📈 Architecture & Scalability

- Component-based React architecture
- Context API for global state management
- Custom hooks for reusability
- Modular and extendable structure

---

## 🧑‍💻 Author

**Majdi Hoseen**  
Frontend Developer
