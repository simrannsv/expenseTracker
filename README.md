# Expense Tracker with AI Insights

A personal finance management REST API built with Node.js, Express, and MongoDB. Users can track income and expenses, set category-wise budget limits, and get AI-powered spending insights.

## Tech Stack
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcrypt for password hashing
- Groq AI API (coming soon)

## Features
- User registration and login with JWT auth
- Add, view, update, delete expenses
- Auto-link expenses to logged in user
- Category-wise budget limits
- Budget alerts when limit is exceeded
- AI categorization of expenses (coming soon)
- AI monthly spending insights (coming soon)
- Receipt scanning via OCR (coming soon)
- Export reports as PDF/CSV (coming soon)

## Getting Started

### Prerequisites
- Node.js
- MongoDB (local or Atlas)

### Installation
1. Clone the repo
   git clone https://github.com/yourusername/expenseTracker.git

2. Install dependencies
   cd backend
   npm install

3. Create a .env file
   DB_URL=mongodb://localhost:27017/ExpenseTracker-Expense
   PORT=4545
   SECRET_KEY=your_secret_key

4. Run the server
   node server.js

## API Endpoints

### User
- POST /user-api/register - Register a new user
- POST /user-api/login    - Login and get token
- GET  /user-api/logout   - Logout

### Expenses (requires auth token)
- POST   /expense-api/addExpense        - Add new expense
- GET    /expense-api/readExpenses      - Get all expenses
- PUT    /expense-api/updateExpense/:id - Update an expense
- DELETE /expense-api/deleteExpense/:id - Delete an expense

### Budget (requires auth token)
- POST /budget-api/addLimit      - Set budget limit for a category
- GET  /budget-api/checkLimit    - View all budget limits
- PUT  /budget-api/editLimit/:id - Update a budget limit

## Authentication
All expense and budget routes require a JWT token in the request header:
Authorization: Bearer your_token_here
