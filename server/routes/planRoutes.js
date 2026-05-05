// routes/planRoutes.js
import express from "express";
import { createPlan, reschedulePlan, markTaskDone, getPlans  } from "../controllers/planController.js";




const router = express.Router();

router.post("/", createPlan); 
router.post("/reschedule", reschedulePlan);
router.put("/:id/task/:taskId", markTaskDone);
router.get("/", getPlans); // ✅ GET all plans


export default router;