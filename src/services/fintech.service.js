import Fintech from "../models/fintech.model.js";
import { generateApiKey, generateApiSecret } from "../utils/generateKeys.js";

export const onboardFintech = async data => {
    const exists = await Fintech.findOne({ email: data.email });

    if (exists) {
        return { error: "Fintech already exists" };
    }

    const apiKey = generateApiKey();
    const apiSecret = generateApiSecret();

    // simulate bank code + name (from NIBSS system)
    const bankCode = Math.floor(100 + Math.random() * 900).toString();
    const bankName = data.name.trim().toUpperCase();

    const fintech = await Fintech.create({
        name: data.name,
        email: data.email,
        apiKey,
        apiSecret,
        bankCode,
        bankName
    });

    return {
        message: "Fintech onboarded successfully",
        apiKey: fintech.apiKey,
        apiSecret: fintech.apiSecret,
        bankCode: fintech.bankCode,
        bankName: fintech.bankName
    };
};
