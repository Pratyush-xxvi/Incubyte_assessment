# 🏎️ Car Dealership Inventory System

A full-stack Car Dealership Inventory Management System built using **Java Spring Boot**, **Spring Security**, **JWT Authentication**, **Spring Data JPA**, **MySQL**, and **React (Vite)**.

The application enables customers to browse and purchase vehicles while allowing administrators to manage inventory and customer orders through a secure role-based system.

**Repository:**  
https://github.com/Pratyush-xxvi/Incubyte_assessment

---

# 🚀 Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- BCrypt Password Encryption
- Role-Based Authorization (Admin & Customer)

---

## Vehicle Management

- View Vehicles
- Search Vehicles
- Add Vehicle (Admin)
- Update Vehicle (Admin)
- Delete Vehicle (Admin)
- Restock Vehicle (Admin)

---

## Order Management

- Purchase Vehicles
- Create Purchase Orders
- View Customer Orders
- Admin Order Dashboard
- Approve Orders
- Reject Orders

---

## Frontend

- React + Vite
- Responsive User Interface
- Customer Dashboard
- Admin Dashboard
- Purchase Modal
- Order Management Screen
- Protected Routes using JWT

---

# 🛠 Technology Stack

| Layer | Technology |
|--------|------------|
| Backend | Java 17, Spring Boot |
| Security | Spring Security, JWT |
| Database | MySQL |
| ORM | Spring Data JPA (Hibernate) |
| Frontend | React 18, Vite |
| Styling | Tailwind CSS |
| HTTP Client | Axios |

---

# 📂 Project Structure

```
car-dealership-system/
│
├── backend/
├── frontend/
├── screenshots/
├── README.md
├── PROMPTS.md
└── .gitignore
```

---

# ⚙️ Prerequisites

- Java 17+
- Maven
- Node.js 18+
- MySQL Server

---

# 🚀 Backend Setup

Navigate to the backend folder

```bash
cd backend
```

Copy

```
.env.example
```

to

```
.env
```

Configure the following variables

```env
DB_URL=jdbc:mysql://localhost:3306/dealership
DB_USERNAME=your_username
DB_PASSWORD=your_password
JWT_SECRET=your_secret_key
```

Create a MySQL database

```sql
CREATE DATABASE dealership;
```

Run the backend

```bash
mvn clean install

mvn spring-boot:run
```

Backend runs on

```
http://localhost:8080
```

*(Change this to 8081 if your application uses port 8081.)*

---

# 💻 Frontend Setup

Navigate to frontend

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Run

```bash
npm run dev
```

Frontend runs on

```
http://localhost:3000
```

---

# 🔑 Demo Credentials

## Admin

```
Username: admin
Password: admin123
```

## Customer

```
Username: customer
Password: customer123
```

---

# 📸 Screenshots

## Customer Dashboard

![Customer Dashboard](./screenshots/customer.png)

---

## Vehicle List

![Vehicle List](./screenshots/vehicless.png)

---

## Admin Dashboard

![Admin Dashboard](./screenshots/admin_dashboard.png)

---

## Admin Orders

![Admin Orders](./screenshots/adminn.png)

---

# 🧪 Testing

The following functionality was verified during development:

- User Registration
- User Login
- JWT Authentication
- Vehicle CRUD Operations
- Vehicle Search
- Vehicle Purchase
- Vehicle Restock
- Order Creation
- Order Approval
- Order Rejection
- Role-Based Authorization

---

# 🤖 My AI Usage

AI tools were used as development assistants during this project to:

- Discuss implementation approaches
- Understand Spring Security and JWT concepts
- Debug backend and frontend issues
- Review REST API design
- Improve documentation

All AI-generated suggestions were reviewed, modified where required, tested, and integrated before being included in the final project.

---

# 📄 Environment Variables

Backend

```
backend/.env.example
```

Frontend

```
frontend/.env.example
```

Copy both files to `.env` before running the project.

---

# 👨‍💻 Author

**Pratyush Prakash Jha**

GitHub Repository:

https://github.com/Pratyush-xxvi/Incubyte_assessment
