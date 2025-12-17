# E-Commerce Platform - RESTful API

A comprehensive backend API for managing an e-commerce platform with authentication, product management, and order processing capabilities.

## Table of Contents

- Project Overview
- Features
- Tech Stack
- API Documentation
- Installation
- Configuration
- Running the Server
- API Documentation
- Postman Collection

---

## Project Overview

The E-Commerce Platform API is backend solution built with Node.js, Express.js, and MongoDB. It provides a complete set of RESTful endpoints for managing users, products, and orders.

This API implements industry-standard practices including JWT authentication, role-based access control, input validation, comprehensive logging, and interactive API documentation.

**Key Highlights:**

- Secure JWT-based authentication
- Role-based authorization (Customer/Admin)
- Complete product lifecycle management
- Order processing with stock management
- Transaction-based order handling
- Input validation with express-validator

---

## Features

### Authentication & Authorization

- User registration with password hashing (bcrypt)
- Secure login with JWT tokens
- Role-based access control (Customer, Admin)
- Protected routes with middleware authentication

### Product Management

- Create, read, update, and delete products (Admin only)
- Product filtering by category and price range
- Pagination and sorting support
- Stock quantity tracking

### Order Management

- Place orders with multiple products
- Automatic total amount calculation
- Real-time stock quantity updates
- Transaction-based order processing
- View own orders (Customer)
- View all orders (Admin)
- Cancel orders with business rules
- Update order status (Admin)
- Status tracking: CONFIRMED → SHIPPED → DELIVERED

### Additional Features

- Input validation on all endpoints
- Comprehensive error handling

---

## Tech Stack

### Core Technologies

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (jsonwebtoken)
- **Password Security:** bcrypt

### Key Libraries

- **Validation:** express-validator
- **Environment:** dotenv

### Development Tools

- **Dev Server:** Nodemon
- **Version Control:** Git

---

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/Kishanth12/e-commerce-Platform-task-backend.git
cd e-commerce-Platform-task-backend
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Create Environment File

Create a `.env` file in the root directory:

```bash
 .env
```

---

## Configuration

Add the following environment variables to your `.env` file:

```env
# Server Configuration
PORT=5001

# Database Configuration
MONGO_URI=<MONGO_URI>

# JWT Configuration
JWT_SECRET=<your_secret>

```

---

### Running the Development Server

```bash
npm run dev
```

---

## Postman Collection

You can import the Postman collection to test all API endpoints:

[Download Postman Collection](./postman/e-commerce-backend-task.postman_collection.json)

---
