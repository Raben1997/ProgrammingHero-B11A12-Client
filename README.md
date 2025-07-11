# 🎓 Scholarship Management System

A full-stack web application to manage and apply for scholarships, built with **React**, **Express.js**, **MongoDB**, **Firebase Authentication**, and **Stripe Payments**.

---

## 🔗 Live Site

[🔗 Visit the live app](https://scholarship-management-system1.web.app)

---

## 🚀 Features

### 👤 Authentication & Authorization

- Firebase Authentication (Email/Password & Google)
- Role-based access control: `admin`, `user`, `reviewer`
- Protected routes with Firebase ID token verification

### 🎓 Scholarships

- Admins can add, edit, or delete scholarships
- Users can browse all available scholarships
- Reviews and ratings per scholarship

### 📝 Applications

- Users can apply for scholarships
- Application history with status tracking
- Feedback and status update (admin side)

### 💳 Stripe Integration

- Stripe payment for application processing
- Secure payment handling and status update

### 🛡️ Security

- Backend routes protected using Firebase token verification
- Axios interceptor to inject accessToken automatically
- Unauthorized (401) and forbidden (403) handling

---

## 📦 Tech Stack

| Tech         | Description                              |
|--------------|------------------------------------------|
| React        | Frontend UI                              |
| Firebase     | Auth (email/password + Google login)     |
| Express.js   | Backend REST API                         |
| MongoDB      | Database for users, applications, etc.   |
| Stripe       | Payment gateway                          |
| Tailwind CSS | Styling framework                        |
| React Query  | Data fetching and caching                |

---




