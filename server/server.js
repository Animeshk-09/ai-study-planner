import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";

import planRoutes from "./routes/planRoutes.js";

dotenv.config();

console.log("ENV TEST:", process.env.CLIENT_ID);
console.log("CLIENT_ID:", process.env.CLIENT_ID);
console.log("CLIENT_SECRET:", process.env.CLIENT_SECRET);
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/plan", planRoutes);
app.use("/auth", authRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"));

app.listen(5000, () => console.log("Server running"));