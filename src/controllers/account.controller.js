import axios from "axios";
import dotenv from "dotenv";
import Account from "../models/account.model.js";
import Transaction from "../models/transaction.model.js";
import { createAccount as createAccountService } from "../services/account.service.js";

dotenv.config();

const PHOENIX_TOKEN = process.env.PHOENIX_TOKEN?.trim();

/*
    CREATE ACCOUNT
*/
export const createAccount = async (req, res) => {
    try {
        const fintech = req.fintech;

        if (!fintech) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const result = await createAccountService(req.body, fintech);

        if (result.error) {
            return res.status(400).json({
                message: result.error
            });
        }

        return res.status(201).json(result);
    } catch (error) {
        console.error("ACCOUNT ERROR:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

/*
    NAME ENQUIRY
*/
export const nameEnquiry = async (req, res) => {
    try {
        const { accountNumber } = req.params;

        const account = await Account.findOne({ accountNumber });

        if (!account) {
            return res.status(404).json({
                message: "Account not found"
            });
        }

        return res.status(200).json({
            accountNumber: account.accountNumber,
            accountName: account.accountName,
            bankName: account.bankName
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

/*
    ACCOUNT BALANCE
*/
export const getBalance = async (req, res) => {
    try {
        const { accountNumber } = req.params;

        const account = await Account.findOne({ accountNumber });

        if (!account) {
            return res.status(404).json({
                message: "Account not found"
            });
        }

        return res.status(200).json({
            accountNumber: account.accountNumber,
            balance: account.balance
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

/*
    TRANSFER FUNDS
*/
export const transferFunds = async (req, res) => {
    try {
        const fintech = req.fintech;

        if (!fintech) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const { from, to, amount } = req.body;

        if (!from || !to || !amount) {
            return res.status(400).json({
                message: "from, to, and amount are required"
            });
        }

        if (from === to) {
            return res.status(400).json({
                message: "Cannot transfer to same account"
            });
        }

        const sender = await Account.findOne({ accountNumber: from });
        const receiver = await Account.findOne({ accountNumber: to });

        if (!sender) {
            return res.status(404).json({
                message: "Sender account not found"
            });
        }

        const amt = Number(amount);

        if (sender.balance < amt) {
            return res.status(400).json({
                message: "Insufficient funds"
            });
        }

        // INTERBANK TRANSFER (NIBSS / PHOENIX)

        if (!receiver) {
            sender.balance -= amt;
            await sender.save();

            try {
                const response = await axios.post(
                    "https://nibssbyphoenix.onrender.com/api/transfer",
                    {
                        accountNumber: to,
                        amount: amt,
                        bankCode: fintech.bankCode
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${PHOENIX_TOKEN}`,
                            "Content-Type": "application/json"
                        }
                    }
                );

                const transactionId = "TX" + Date.now();

                await Transaction.create({
                    transactionId,
                    from,
                    to,
                    amount: amt,
                    status: response.data?.status || "SUCCESS",
                    type: "INTERBANK",
                    bankCode: fintech.bankCode,
                    bankName: fintech.bankName
                });

                return res.status(200).json({
                    message: "Interbank transfer successful",
                    transactionId,
                    externalResponse: response.data
                });
            } catch (error) {
                console.error(
                    "PHOENIX ERROR:",
                    error.response?.data || error.message
                );

                return res.status(500).json({
                    message: "External transfer failed",
                    error: error.response?.data || error.message
                });
            }
        }

        // INTERNAL TRANSFER

        sender.balance -= amt;
        receiver.balance += amt;

        await sender.save();
        await receiver.save();

        const transactionId = "TX" + Date.now();

        await Transaction.create({
            transactionId,
            from,
            to,
            amount: amt,
            status: "SUCCESS",
            type: "INTERNAL",
            bankCode: fintech.bankCode,
            bankName: fintech.bankName
        });

        return res.status(200).json({
            message: "Transfer successful",
            transactionId,
            from,
            to,
            amount: amt,
            status: "SUCCESS",
            type: "INTERNAL"
        });
    } catch (error) {
        console.error("TRANSFER ERROR:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

/*
    TRANSACTION STATUS
*/
export const getTransaction = async (req, res) => {
    try {
        const { ref } = req.params;

        const transaction = await Transaction.findOne({
            transactionId: ref
        });

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found"
            });
        }

        return res.status(200).json({
            transactionId: transaction.transactionId,
            from: transaction.from,
            to: transaction.to,
            amount: transaction.amount,
            status: transaction.status,
            bankCode: transaction.bankCode,
            bankName: transaction.bankName
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

/*
    TRANSACTION HISTORY
*/
export const getTransactionHistory = async (req, res) => {
    try {
        const { accountNumber } = req.params;
        const fintech = req.fintech;

        if (!fintech) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const account = await Account.findOne({ accountNumber });

        if (!account) {
            return res.status(404).json({
                message: "Account not found"
            });
        }

        if (account.bankCode !== fintech.bankCode) {
            return res.status(403).json({
                message: "Access denied: not your account"
            });
        }

        const transactions = await Transaction.find({
            $or: [{ from: accountNumber }, { to: accountNumber }]
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            accountNumber,
            transactions
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
