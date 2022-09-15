import express from "express";
const router = express.Router();

// Functions
import {
  planner,
  savePlanner,
  getTasks,
  addTask,
  users,
} from "../controllers.js";

router.route("/").get(planner);
router.route("/").post(savePlanner);
router.route("/tasks").get(getTasks);
router.route("/tasks").post(addTask);
router.route("/users").get(users);

export default router;
