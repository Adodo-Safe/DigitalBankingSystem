import { onboardFintech } from "../services/fintech.service.js";

export const registerFintech = async (req, res) => {
    const result = await onboardFintech(req.body);

    if (result.error) {
        return res.status(400).json(result);
    }

    res.status(201).json(result);
};