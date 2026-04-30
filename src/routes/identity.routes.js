import express from "express";
import {
    insertBvn,
    checkBvn,
    insertNin,
    checkNin
} from "../controllers/identity.controller.js";

const router = express.Router();

// BVN routes
router.post("/insertBvn", insertBvn);
router.post("/validateBvn", checkBvn);

// NIN routes
router.post("/insertNin", insertNin);
router.post("/validateNin", checkNin);

export default router;
