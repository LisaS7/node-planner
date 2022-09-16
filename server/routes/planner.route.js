import express from "express";
const router = express.Router();

// Functions
import {
  getPlanner,
  postPlanner,
  admin,
} from "../controllers/plannerController.js";
import { getUsers, postUser } from "../controllers/userController.js";
import { getTasks, postTask } from "../controllers/taskController.js";

router.route("/").get(getPlanner);
router.route("/").post(postPlanner);
router.route("/tasks").get(getTasks);
router.route("/tasks").post(postTask);
router.route("/users").get(getUsers);
router.route("/users").post(postUser);
router.route("/admin").get(admin);

export default router;
