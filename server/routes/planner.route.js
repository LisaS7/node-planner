import express from "express";
const router = express.Router();

// Functions
import {
  getPlanner,
  postPlanner,
  admin,
} from "../controllers/plannerController.js";
import {
  getUsers,
  postUser,
  deleteUser,
  clearUserPlans,
} from "../controllers/userController.js";
import {
  getTasks,
  postTask,
  deleteTask,
} from "../controllers/taskController.js";

router.route("/").get(getPlanner);
router.route("/").post(postPlanner);
router.route("/tasks").get(getTasks);
router.route("/tasks").post(postTask);
router.route("/tasks/:id/delete").get(deleteTask);
router.route("/users").get(getUsers);
router.route("/users").post(postUser);
router.route("/users/:id/delete").get(deleteUser);
router.route("/users/:id/clearplans").get(clearUserPlans);
router.route("/admin").get(admin);

export default router;
