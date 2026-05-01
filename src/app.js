import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import identityRoutes from "./routes/identity.routes.js";
import fintechRoutes from "./routes/fintech.routes.js";
import accountRoutes from "./routes/account.routes.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

// routes
app.use("/api/identity", identityRoutes);
app.use("/api/fintech", fintechRoutes);
app.use("/api/account", accountRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Digital Banking System API running");
});

export default app;
