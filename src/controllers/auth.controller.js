import jwt from "jsonwebtoken";
import Fintech from "../models/fintech.model.js";

export const loginFintech = async (req, res) => {
    try {
        const { apiKey, apiSecret } = req.body;

        if (!apiKey || !apiSecret) {
            return res.status(400).json({
                message: "apiKey and apiSecret are required"
            });
        }

        const fintech = await Fintech.findOne({ apiKey, apiSecret });

        if (!fintech) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            {
                fintechId: fintech._id,
                bankCode: fintech.bankCode,
                bankName: fintech.bankName
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            token
        });

    } catch (error) {
        console.error("LOGIN ERROR:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};