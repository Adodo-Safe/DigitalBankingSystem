# Digital Banking System API (TS Academy Assignment)

## Description
A Node.js + Express + MongoDB backend API for a digital banking system with fintech onboarding, authentication, account management, transfers (internal & interbank), and transaction tracking.

## Features
- Fintech onboarding (API Key & Secret generation)
- JWT authentication (apiKey + apiSecret → token)
- Account creation using BVN/KYC simulation
- Balance enquiry
- Name enquiry
- Internal transfers
- Interbank transfers (Phoenix/NIBSS)
- Transaction history
- Data privacy and access control

## Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Axios
- Dotenv

## Installation
```bash
npm install
```

## Environment Variables
Create a `.env` file:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PHOENIX_TOKEN=your_phoenix_token
```

## Running the Server
```bash
npm run dev
```

## API Endpoints

### Authentication
POST /api/auth/login

### Fintech
POST /api/fintech/onboard

### Accounts
POST /api/account/create  
GET /api/account/balance/:accountNumber  
GET /api/account/name-enquiry/:accountNumber  

### Transfers
POST /api/account/transfer  

### Transactions
GET /api/account/transactions/:accountNumber  
GET /api/account/transaction/:ref  

## Authentication
All protected routes require:
Authorization: Bearer <JWT_TOKEN>

## Interbank Integration
Uses Phoenix (NIBSS simulation) API for external transfers.

## Notes
- `.env` is not included for security
- JWT expires in 1 hour
- MongoDB must be running