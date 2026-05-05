// models/Plan.js
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  subject: String,
  topic: String,
  duration: Number,
  status: { type: String, default: "pending" } // pending / done
});

const planSchema = new mongoose.Schema({
  userId: String,
  date: String,
  tasks: [taskSchema],
});

export default mongoose.model("Plan", planSchema);