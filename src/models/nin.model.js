import mongoose from "mongoose";

const ninSchema = new mongoose.Schema(
    {
        nin: {
            type: String,
            required: true,
            unique: true
        },
        firstName: String,
        lastName: String,
        dob: String
    },
    { timestamps: true }
);

export default mongoose.model("NIN", ninSchema);