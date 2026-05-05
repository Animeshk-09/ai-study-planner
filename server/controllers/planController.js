// controllers/planController.js

import Plan from "../models/Plan.js";
import { generateStudyPlan } from "../services/aiService.js";
import { pushPlanToCalendar } from "../services/calendarService.js";

// ✅ CREATE PLAN
export const createPlan = async (req, res) => {
  try {
    const plan = await generateStudyPlan(req.body);

    const tokens = global.userTokens;

    if (!tokens) {
      return res.status(401).json({ error: "User not authenticated with Google" });
    }

    for (let day of plan) {
      await Plan.create({
        date: day.date,
        tasks: day.tasks.map(task => ({
          ...task,
          status: "pending"
        }))
      });
    }

    await pushPlanToCalendar(plan, tokens);

    res.json(plan);
  } catch (err) {
    console.error("❌ CREATE PLAN ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ MARK TASK DONE (ADD HERE)
export const markTaskDone = async (req, res) => {
  const { id, taskId } = req.params;

  await Plan.updateOne(
    { _id: id, "tasks._id": taskId },
    { $set: { "tasks.$.status": "done" } }
  );

  res.json({ message: "Task marked as done" });
};

// ✅ RESCHEDULE
export const reschedulePlan = async (req, res) => {
  const { date } = req.body;

  const incomplete = await Plan.find({
    date,
    "tasks.status": "pending"
  });

  const nextDateStr = new Date(
    new Date(date).getTime() + 24 * 60 * 60 * 1000
  ).toISOString().split("T")[0];

  for (let item of incomplete) {
    const pendingTasks = item.tasks.filter(t => t.status === "pending");

    if (pendingTasks.length > 0) {
      await Plan.create({
        date: nextDateStr,
        tasks: pendingTasks
      });
    }
  }

  res.json({ message: "Rescheduled" });
};
// ✅ GET ALL PLANS (ADD HERE)
export const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find().sort({ date: 1 }); // optional sorting
    res.json(plans);
  } catch (err) {
    console.error("❌ GET PLANS ERROR:", err);
    res.status(500).json({ error: "Failed to fetch plans" });
  }
};