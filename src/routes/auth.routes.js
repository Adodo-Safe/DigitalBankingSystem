import express from "express";
import { loginFintech } from "../controllers/auth.controller.js";

const router = express.Router();

/*
    FINTECH LOGIN → JWT TOKEN
*/

router.post("/auth/token", loginFintech);

export default router;