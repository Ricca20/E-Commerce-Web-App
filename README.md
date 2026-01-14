# Clothing Brand E-Commerce Web App

A full-stack E-Commerce application built with the **MERN Stack** (MongoDB, Express, React, Node.js). This project demonstrates a complete shopping flow from product discovery to checkout and order confirmation.

## 🛠 Technologies Used

- **Frontend:** React.js, Tailwind CSS, Framer Motion (Animations), React Router, Context API (State Management)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JSON Web Tokens (JWT), Bcrypt (Password Hashing)
- **Email Service:** Nodemailer

## ✨ Key Functionalities

- **User Authentication:** Secure Register & Login with JWT.
- **Product Management:** Browse products with Search, Sort, and Filters (Category, Size, Price).
- **Shopping Cart:**
    - Fully functional cart with Add/Remove items.
    - Persistent cart for both Guests (Local Storage) and Logged-in Users (Database).
    - Dynamic subtotal calculation.
- **Checkout Process:**
    - Shipping address collection.
    - Order summary review.
    - Mock payment integration.
- **Order System:**
    - Order creation and storage in database.
    - **Automated Email Confirmation** sent upon successful order placement.
- **Responsive Design:** Mobile-friendly UI with modern styling.

## 🚀 How to Use

### 1. Prerequisites
- Node.js installed.
- MongoDB installed locally or a MongoDB Atlas connection string.

### 2. Installation

Clone the repository and install dependencies for both server and client.

```bash
# Install Server Dependencies
cd server
npm install

# Install Client Dependencies
cd ../client
npm install
```

### 3. Environment Setup

Create a `.env` file in the `server` directory with the following variables:

```env
MONGODB_URI=mongodb://localhost:27017/clothing-brand-ecommerce
JWT_SECRET=your_jwt_secret_key_here
PORT=5000

# Email Configuration (for Order Confirmations)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

### 4. Database Seeding

Populate the database with initial product data.

```bash
cd server
node seed.js
```

### 5. Running the Application

Is best to run terminal commands in two separate terminals.

**Terminal 1 (Server):**
```bash
cd server
npm run dev
```

**Terminal 2 (Client):**
```bash
cd client
npm run dev
```

The application will launch at `http://localhost:5173` (or the port specified by Vite/React).
