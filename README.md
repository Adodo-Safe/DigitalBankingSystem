# Digital Banking System API

A Node.js + Express + MongoDB backend API for a digital banking system with fintech onboarding, authentication, accounts, transfers, and transaction tracking.

## Features
- Fintech onboarding (API Key & Secret)
- JWT authentication
- Account creation using BVN/KYC
- Balance enquiry
- Name enquiry
- Fund transfers
- Transaction history (user-specific)
- Data privacy and access control

## Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Dotenv

## Setup
npm install

Create .env file:
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run server:
npm run dev
or
node server.js

## API Endpoints

Fintech:
POST /api/fintech/onboard
POST /api/auth/token

Accounts:
POST /api/account/create (Bearer token required)
GET /api/account/balance/:accountNumber (Bearer token required)
GET /api/account/name-enquiry/:accountNumber (Bearer token required)

Transfers:
POST /api/account/transfer (Bearer token required)

Transactions:
GET /api/account/transactions/:accountNumber (Bearer token required)

## Authentication
Authorization: Bearer <JWT_TOKEN>

