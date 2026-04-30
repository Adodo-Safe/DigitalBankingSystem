import {
    createBvn,
    validateBvn,
    createNin,
    validateNin
} from "../services/identity.service.js";

// BVN create
export const insertBvn = async (req, res) => {
    try {
        const result = await createBvn(req.body);

        if (result.error) {
            return res.status(400).json(result);
        }

        return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// BVN validate
export const checkBvn = async (req, res) => {
    try {
        const result = await validateBvn(req.body.bvn);

        if (result.error) {
            return res.status(404).json(result);
        }

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// NIN create
export const insertNin = async (req, res) => {
    try {
        const result = await createNin(req.body);

        if (result.error) {
            return res.status(400).json(result);
        }

        return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// NIN validate
export const checkNin = async (req, res) => {
    try {
        const result = await validateNin(req.body.nin);

        if (result.error) {
            return res.status(404).json(result);
        }

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};