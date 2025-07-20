# 🏡 Real Estate Platform - MERN Stack

> Assignment Category: `Assignment12_category_008`  
> Built With: **MERN Stack** (MongoDB, Express.js, React, Node.js)

---

## 🔗 Live Project Links

- 🌐 **Live Site:** [your-live-site-url.com](https://your-live-site-url.com)
- 💻 **Client GitHub:** [github.com/yourusername/client-repo](https://github.com/yourusername/client-repo)
- 🖥️ **Server GitHub:** [github.com/yourusername/server-repo](https://github.com/yourusername/server-repo)

---

## 👥 Demo Accounts

### 🔑 Admin
- **Email:** admin@example.com
- **Password:** adminPassword123

### 👔 Agent
- **Email:** agent@example.com
- **Password:** agentPassword123

---

## 🎯 Project Overview

A full-featured **Real Estate Platform** that allows users to buy and wishlist properties, agents to list and manage properties, and admins to verify, moderate, and control all activity. Role-based dashboards with protected routes and dynamic CRUD operations were implemented using the latest React ecosystem tools.

---

## 🚀 Features At a Glance

1. 🔐 Role-Based Dashboards: User, Agent, Admin  
2. 📦 Wishlist + Purchase System  
3. 📝 Property Reviews & Moderation  
4. ✅ Admin Property Verification & Fraud Detection  
5. 📊 Agent Selling Statistics (Charts with Recharts)  
6. 💳 Stripe Payment Integration  
7. 🔎 Search, Sort, and Filter for Properties  
8. 📣 Advertise Verified Properties  
9. 📱 Fully Responsive (Mobile, Tablet, Desktop)  
10. 💥 Real-Time Notifications (Toast / SweetAlert2)

---

## 🧪 Authentication

- Email/Password Login & Registration
- Google Social Login
- Password Validation:
  - Minimum 6 characters
  - At least one capital letter
  - At least one special character
- Firebase Auth + JWT-based session persistence

---

## 🔐 Role-Based Dashboards

### 👤 User Dashboard
- My Profile
- Wishlist Properties
- Property Purchase Offers
- My Reviews

### 👔 Agent Dashboard
- Agent Profile
- Add Property
- My Added & Sold Properties
- Requested Offers Management

### 🛡️ Admin Dashboard
- Admin Profile
- Manage Properties
- Manage Users (Make Admin/Agent, Fraud Marking)
- Manage Reviews
- Advertise Properties
- Reported Properties Handling

---

## 📄 Pages & Routes

| Page Name               | Access        | Description                                           |
|------------------------|---------------|-------------------------------------------------------|
| Home                   | Public        | Banner, Advertisement, Reviews, Extra Sections       |
| All Properties         | Private       | View all verified properties                          |
| Property Details       | Private       | View property info, wishlist, review                  |
| Login / Register       | Public        | Email/password + Google login                         |
| Dashboard              | Private       | Role-based dashboard routing                          |
| 404 Not Found          | Public        | Custom not-found page                                 |

---

## 🧰 Tech Stack & Tools

- **Frontend:** React, React Router DOM, TanStack Query, TailwindCSS
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** Firebase Auth + JWT
- **State Management:** Context API + React Query
- **Forms & Validation:** React Hook Form, Zod (optional)
- **Notifications:** React Toastify / SweetAlert2
- **Payment:** Stripe Integration
- **Charts:** Recharts
- **Slider:** Swiper.js
- **Axios Interceptor:** Implemented

---

## 🔍 Advanced Features (Challenge + Optional)

- 🔍 Search by Location (All Properties Page)
- 🔃 Sort by Price Range
- 📊 Sales Chart (Agent Dashboard)
- 🚨 Report Properties + Admin Moderation
- 🧠 JWT Auth with LocalStorage
- ⚙️ Axios Interceptor for Global Error Handling
- 🔧 React Hook Form for All Forms
- 🌐 Responsive Dashboards for All Devices

---