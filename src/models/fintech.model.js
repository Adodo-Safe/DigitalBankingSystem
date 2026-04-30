import mongoose from "mongoose";

const fintechSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    apiKey: {
        type: String,
        required: true,
        unique: true
    },
    apiSecret: {
        type: String,
        required: true
    },
    bankCode: {
        type: String
    },
    bankName: {
        type: String
    }
}, { timestamps: true });

export default mongoose.model("Fintech", fintechSchema);