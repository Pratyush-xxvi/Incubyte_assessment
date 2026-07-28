# 🏎️ Car Dealership Inventory System (TDD Kata)

A full-stack, production-ready **Car Dealership Inventory Management System** built with **Java Spring Boot 3**, **Spring Security + JWT Authentication**, **Spring Data JPA**, **H2 File-based Database**, and a **React JS (Vite) + Tailwind CSS** Single-Page Application.

> **Target Repository**: `https://github.com/Pratyush-xxvi/Incubyte_assessment.git`  
> **Development Methodology**: Test-Driven Development (TDD) using Red-Green-Refactor patterns.

---

## 🌟 Features Overview

### 1. Backend RESTful API (Spring Boot 3)
- **Token-Based Authentication**: Secure JWT generation and validation (`POST /api/auth/register`, `POST /api/auth/login`).
- **Role-Based Access Control**:
  - `ROLE_CUSTOMER`: Access catalog, search, filter, and purchase vehicles.
  - `ROLE_ADMIN`: All customer privileges plus capabilities to create, update, delete, and restock vehicles.
- **Vehicle Catalog Management**:
  - `GET /api/vehicles`: Retrieve all vehicles.
  - `GET /api/vehicles/search`: Filter by make, model, category, or price range.
  - `POST /api/vehicles`: Add new vehicle *(Admin Only)*.
  - `PUT /api/vehicles/:id`: Update vehicle details *(Admin Only)*.
  - `DELETE /api/vehicles/:id`: Delete vehicle *(Admin Only)*.
- **Inventory Stock Control**:
  - `POST /api/vehicles/:id/purchase`: Purchase vehicle, automatically decreasing quantity in stock (rejects if out-of-stock).
  - `POST /api/vehicles/:id/restock`: Restock vehicle, increasing quantity *(Admin Only)*.

### 2. Frontend Single-Page Application (React + Tailwind CSS)
- **Modern Dark UI Design**: Glassmorphism cards, vibrant status badges, responsive grid, live stock indicators.
- **Interactive Multi-Filter Bar**: Real-time search query by make/model/VIN, category pills (SUV, Sedan, Electric, Sports, Luxury, Truck), and price slider.
- **Purchase Workflow**: Disabled purchase button when stock count is zero, quantity multiplier calculation, instant stock status refresh.
- **Admin Management Suite**: Modal forms to Add, Edit, Delete, or Restock vehicle items (+N units).
- **Quick Demo Login Switcher**: Instant one-click authentication as **Admin** (`admin` / `admin123`) or **Customer** (`customer` / `customer123`).

---

## ⚙️ Technology Stack

| Layer | Technology |
|---|---|
| **Backend Framework** | Java 17, Spring Boot 3.2.3, Spring Web |
| **Security & Auth** | Spring Security, JJWT (io.jsonwebtoken), BCrypt |
| **Persistence Layer** | Spring Data JPA, H2 Database (File Mode `./data/dealershipdb`) |
| **Testing Framework** | JUnit 5, Mockito, Spring Boot MockMvc |
| **Frontend Framework** | React 18, Vite, Tailwind CSS 3 |
| **HTTP Client** | Axios (with automatic Bearer token interceptor) |

---

## 🚀 Setup and Local Execution Guide

### Prerequisites
- **Java Development Kit (JDK 17 or higher)**
- **Apache Maven 3.8+**
- **Node.js (v18+) & npm**

---

### Step 1: Running the Backend (Spring Boot API)

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Build and run unit/integration tests
mvn clean test

# 3. Start the Spring Boot Application server
mvn spring-boot:run
```

*The API backend will start at:* `http://localhost:8080`  
*H2 Database Console is accessible at:* `http://localhost:8080/h2-console`  
- JDBC URL: `jdbc:h2:file:./data/dealershipdb`
- Username: `sa`
- Password: `password`

---

### Step 2: Running the Frontend (React SPA)

```bash
# 1. Navigate to the frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Start Vite local development server
npm run dev
```

*The frontend application will start at:* `http://localhost:3000`

---

## 🧪 Test Execution Report

The backend architecture was engineered adhering strictly to **Test-Driven Development (TDD)** principles.

### Test Summary Output

```text
[INFO] -------------------------------------------------------
[INFO]  T E S T S
[INFO] -------------------------------------------------------
[INFO] Running com.dealership.service.AuthServiceTest
[INFO] Tests run: 3, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.842 s - in com.dealership.service.AuthServiceTest
[INFO] Running com.dealership.service.VehicleServiceTest
[INFO] Tests run: 8, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.412 s - in com.dealership.service.VehicleServiceTest
[INFO] Running com.dealership.controller.AuthControllerTest
[INFO] Tests run: 2, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 2.145 s - in com.dealership.controller.AuthControllerTest
[INFO] Running com.dealership.controller.VehicleControllerTest
[INFO] Tests run: 6, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 1.832 s - in com.dealership.controller.VehicleControllerTest
[INFO] 
[INFO] Results:
[INFO] 
[INFO] Tests run: 19, Failures: 0, Errors: 0, Skipped: 0
[INFO] -------------------------------------------------------
[INFO] BUILD SUCCESS
```

### Verified Test Scenarios
1. `AuthServiceTest.register_Success`: Validates password encryption and JWT token issuance upon registration.
2. `AuthServiceTest.register_DuplicateUsername_ThrowsException`: Ensures unique username constraint enforcement.
3. `VehicleServiceTest.purchaseVehicle_Success_DecreasesQuantity`: Verifies stock count decreases atomically upon purchase.
4. `VehicleServiceTest.purchaseVehicle_OutOfStock_ThrowsException`: Confirms purchase attempts on zero-stock items throw a `BadRequestException`.
5. `VehicleServiceTest.restockVehicle_Success_IncreasesQuantity`: Ensures admin restocking increments quantity.
6. `VehicleControllerTest.createVehicle_CustomerRole_Returns403`: Verifies Spring Security restricts vehicle creation to `ROLE_ADMIN`.

---

## 🤖 My AI Usage

### AI Tools Utilized
- **Antigravity AI (Gemini 3.6 Flash / Pro)**: Primary AI coding companion for architecture design, TDD test suite scaffolding, backend implementation, React component styling, and git history structuring.

### How AI Was Utilized
1. **TDD Scaffolding & Assertion Design**: AI helped outline JUnit 5 test cases and MockMvc request builders before writing business logic implementations (Red-Green-Refactor workflow).
2. **Spring Security & JWT Integration**: Prompted AI to construct JJWT `OncePerRequestFilter` and stateless `SecurityFilterChain` configurations with role authority mappings.
3. **Tailwind CSS UI Design**: AI generated sleek dark-mode glassmorphism styling for vehicle grid cards, stock badges, hero statistics counters, and modal overlays.
4. **Co-authored Commit Trailers**: Automated git commit formatting with AI co-author trailers (`Co-authored-by: Antigravity <AI@users.noreply.github.com>`).

### Reflection on AI Impact
Leveraging AI significantly accelerated the TDD feedback loop. By generating complete unit test skeletons first, edge cases like negative purchase quantities, unauthenticated access, and zero-stock handling were identified early. AI allowed focusing on domain logic, security boundary correctness, and responsive UX design without spending time on repetitive boilerplate configuration.

---

## 📝 Commit History & Co-authorship Format

Every commit follows standard semantic commit conventions with mandatory AI co-authorship metadata:

```bash
git commit -m "feat: Implement vehicle purchase and restock endpoints with TDD tests

Added atomic stock reduction on purchase and admin-only restock logic.

Co-authored-by: Antigravity <AI@users.noreply.github.com>"
```
