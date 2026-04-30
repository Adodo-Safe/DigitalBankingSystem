import BVN from "../models/bvn.model.js";
import NIN from "../models/nin.model.js";

// validation helper
const isValidId = (id) => {
    return typeof id === "string" && id.length === 11 && /^\d+$/.test(id);
};

// ---------------- BVN ----------------

export const createBvn = async (data) => {
    if (!isValidId(data.bvn)) {
        return { error: "BVN must be exactly 11 digits" };
    }

    const exists = await BVN.findOne({ bvn: data.bvn });

    if (exists) {
        return { error: "BVN already exists" };
    }

    const bvn = await BVN.create(data);

    return {
        message: "BVN record created successfully",
        bvn: bvn.bvn
    };
};

export const validateBvn = async (bvnNumber) => {
    if (!isValidId(bvnNumber)) {
        return { error: "Invalid BVN format" };
    }

    const record = await BVN.findOne({ bvn: bvnNumber });

    if (!record) {
        return { error: "BVN not found" };
    }

    return {
        valid: true,
        bvn: record.bvn,
        firstName: record.firstName,
        lastName: record.lastName,
        dob: record.dob
    };
};

// ---------------- NIN ----------------

export const createNin = async (data) => {
    if (!isValidId(data.nin)) {
        return { error: "NIN must be exactly 11 digits" };
    }

    const exists = await NIN.findOne({ nin: data.nin });

    if (exists) {
        return { error: "NIN already exists" };
    }

    const nin = await NIN.create(data);

    return {
        message: "NIN record created successfully",
        nin: nin.nin
    };
};

export const validateNin = async (ninNumber) => {
    if (!isValidId(ninNumber)) {
        return { error: "Invalid NIN format" };
    }

    const record = await NIN.findOne({ nin: ninNumber });

    if (!record) {
        return { error: "NIN not found" };
    }

    return {
        valid: true,
        nin: record.nin,
        firstName: record.firstName,
        lastName: record.lastName,
        dob: record.dob
    };
};