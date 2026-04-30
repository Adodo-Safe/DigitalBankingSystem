import express from "express";
import {
    createAccount,
    nameEnquiry,
    getBalance,
    transferFunds,
    getTransaction,
getTransactionHistory
} from "../controllers/account.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

/*
    PROTECTED ROUTES (JWT REQUIRED)
*/

router.post("/account/create", authenticate, createAccount);
router.get(
    "/account/transactions/:accountNumber",
    authenticate,
    getTransactionHistory
);

router.get("/account/name-enquiry/:accountNumber", authenticate, nameEnquiry);

router.get("/account/balance/:accountNumber", authenticate, getBalance);

router.post("/account/transfer", authenticate, transferFunds);

router.get("/account/transaction/:ref", authenticate, getTransaction);

export default router;



