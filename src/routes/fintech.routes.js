import express from "express";
import { registerFintech } from "../controllers/fintech.controller.js";

const router = express.Router();

router.post("/fintech/onboard", registerFintech);

export default router;