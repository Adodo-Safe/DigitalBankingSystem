import crypto from "crypto";

export const generateApiKey = () => {
    return crypto.randomBytes(16).toString("hex");
};

export const generateApiSecret = () => {
    return crypto.randomBytes(32).toString("hex");
};