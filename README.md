# 🛡️ phVault - Indian Automotive Inventory & Luxury Garage System

A full-stack Car Inventory Management System built using **Java Spring Boot**, **Spring Security**, **JWT Authentication**, **Spring Data JPA**, **MySQL**, and **React (Vite)** with **Tailwind CSS**.

**phVault** enables customers to browse, search, and purchase premier Indian automotive vehicles (Mahindra, Tata, Toyota, Hyundai, BMW, Mercedes-Benz, etc.) with prices in Indian Rupees (₹) while enabling administrators to manage inventory and customer purchase orders through a secure role-based system.

**Repository:**  
https://github.com/Pratyush-xxvi/Incubyte_assessment

---

# 🚀 Key Features

## 🇮🇳 Indian Vehicles Catalog & INR Pricing
- Pre-loaded with top Indian market vehicles (Mahindra Thar Roxx, Tata Nexon EV, Mahindra XUV700, Toyota Fortuner Legender, Hyundai Creta N Line, Maruti Suzuki Jimny, BMW M340i, Mercedes G 63 AMG).
- Dynamic Indian Rupee (₹) formatting with Lakhs & Crores valuation metrics.

## 🔐 Authentication & Role Security
- User Registration & User Login
- JWT Token Authentication with Bearer Interceptor
- BCrypt Password Encryption
- Role-Based Authorization (Admin & Customer)
- One-click Demo Accounts (Admin: `admin` / `admin123`, Customer: `customer` / `customer123`)

---

## 🏎️ Vehicle Inventory Management
- Real-time Inventory Fleet Metrics (Total Models, Showroom Stock, Out of Stock, Total Valuation in ₹)
- Instant Search by Make, Model, or VIN
- Multi-Category Filtering (SUV, Electric, Luxury, Sedan, Sports, Hatchback)
- Dynamic Price Range Slider (in ₹ INR)
- Multi-Criteria Sorting (Price Low-to-High, High-to-Low, Stock Level, Model Year)
- Admin Vehicle Operations: Add Vehicle, Edit Specs, Delete Vehicle, Restock Stock Units

---

## 📦 Order & Reservation System
- Vehicle Purchase / Reservation Modal with Live ₹ Total Calculation
- Customer Delivery Location & Contact Number Support
- Admin Purchase Order Dashboard
- One-Click Approve / Reject Order Workflow

---

# 🛠 Technology Stack

| Layer | Technology |
| font-mono | ------------ |
| Backend | Java 17, Spring Boot 3.2 |
| Security | Spring Security, JWT (jjwt 0.11.5) |
| Database | MySQL / H2 |
| ORM | Spring Data JPA (Hibernate) |
| Frontend | React 18, Vite |
| Styling | Tailwind CSS, Custom Glassmorphism & Micro-animations |
| HTTP Client | Axios |

---

# ⚙️ Prerequisites

- Java 17+
- Maven
- Node.js 18+
- MySQL Server (optional; falls back gracefully to in-memory/demo state)

---

# 🚀 Quick Start Guide

### 1. Backend Setup

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

*Backend runs on:* `http://localhost:8081` or `http://localhost:8080`

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

*Frontend runs on:* `http://localhost:3000` or `http://localhost:5173`

---

# 🔑 Demo Credentials

| Role | Username | Password | Access Level |
|------|----------|----------|--------------|
| **Admin** | `admin` | `admin123` | Full Inventory Management, Order Approvals, Restocking |
| **Customer** | `customer` | `customer123` | Vehicle Browsing, Search, Purchase Orders |

---

# 📄 Environment Variables

**Backend (`backend/.env`):**
```env
DB_URL=jdbc:mysql://localhost:3306/dealership
DB_USERNAME=root
DB_PASSWORD=password
JWT_SECRET=404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970
```

**Frontend (`frontend/.env`):**
```env
VITE_API_URL=http://localhost:8081/api
```

---

# 👨‍💻 Author

**Pratyush Prakash Jha**  
GitHub Repository: [https://github.com/Pratyush-xxvi/Incubyte_assessment](https://github.com/Pratyush-xxvi/Incubyte_assessment)
