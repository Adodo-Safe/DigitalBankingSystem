import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
    {
        accountNumber: {
            type: String,
            required: true,
            unique: true
        },
        accountName: {
            type: String,
            required: true
        },
        bvn: {
            type: String
        },
        nin: {
            type: String
        },
        dob: {
            type: String,
            required: true
        },
        bankCode: {
            type: String,
            required: true
        },
        bankName: {
            type: String,
            required: true
        },
        balance: {
            type: Number,
            default: 15000
        }
    },
    { timestamps: true }
);

export default mongoose.model("Account", accountSchema);