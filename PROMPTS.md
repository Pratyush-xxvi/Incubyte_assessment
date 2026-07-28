# AI Tooling Chat & Prompt Log

This document records the exact prompt history, directives, and interaction iterations used to build the Car Dealership Inventory System following TDD principles.

---

## Initial Prompt & Requirements Submission

```
TDD Kata: Car Dealership Inventory System

Objective
The goal of this kata is to design, build, and test a full-stack Car Dealership Inventory System. This project will test your skills in API development, database management, frontend implementation, testing, and modern development workflows, including the use of AI tools.

Core Requirements
1. Backend API (RESTful)
   - Tech: Spring Boot (Java)
   - Database: Persistent database (H2 File-Based / SQLite)
   - User Authentication: JWT Token-based Auth (User Registration & Login)
   - Endpoints:
     * Auth: POST /api/auth/register, POST /api/auth/login
     * Vehicles: POST /api/vehicles, GET /api/vehicles, GET /api/vehicles/search, PUT /api/vehicles/:id, DELETE /api/vehicles/:id (Admin only)
     * Inventory: POST /api/vehicles/:id/purchase (decrease stock), POST /api/vehicles/:id/restock (increase stock - Admin only)
2. Frontend Application
   - Tech: React JS, HTML5, CSS3, Tailwind CSS
   - Features: Login/Register forms, Inventory Dashboard, Search & Filter UI, Purchase button (disabled if quantity == 0), Admin forms (Add, Update, Delete, Restock).
3. Process & Guidelines:
   - TDD (Red-Green-Refactor pattern with JUnit 5 / MockMvc)
   - Clean Code & SOLID principles
   - Git Version Control with Co-authored-by AI trailers
   - Mandatory README section: "My AI Usage"
   - Root file PROMPTS.md containing AI chat history

Target Repo: https://github.com/Pratyush-xxvi/Incubyte_assessment.git
```

---

## Iterative Agent Workflow & Directives

### 1. Architecture Planning & Database Selection
- Prompted to select Spring Boot 3 + H2 file-based persistent DB + JWT Authentication Filter + Spring Data JPA + React (Vite) + Tailwind CSS.
- Designed Red-Green-Refactor TDD suite containing `AuthServiceTest`, `VehicleServiceTest`, `AuthControllerTest`, and `VehicleControllerTest`.

### 2. TDD Implementation Steps
- **Red Phase**: Formulated unit and integration test assertions for user registration, JWT generation, vehicle CRUD, search filters, stock deduction upon purchase, zero-stock rejection, and admin restock authorization.
- **Green Phase**: Built domain models (`User`, `Vehicle`, `Role`), DTOs, JPA Repositories, `JwtTokenProvider`, `AuthService`, `VehicleService`, `AuthController`, and `VehicleController`.
- **Refactor Phase**: Extracted reusable security context handlers, global exception advice (`GlobalExceptionHandler`), and data initialization scripts (`DataInitializer`).

### 3. Frontend SPA Development
- Implemented single-page React app with Tailwind CSS glassmorphism, responsive grid layout, theme system, `AuthContext`, `ToastContext`, and Axios API interceptors.
- Added quick demo toggle buttons for instant testing as Customer (`customer` / `customer123`) or Admin (`admin` / `admin123`).

---

## AI Co-authorship Commitment
All commits generated during this session append the trailer:
`Co-authored-by: Antigravity <AI@users.noreply.github.com>`
