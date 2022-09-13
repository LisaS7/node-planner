import express from "express"
const router = express.Router()

// Functions
import {calendar, saveCalendar, getTasks, addTask, users} from '../controllers.js'

router.route("/").get(calendar);
router.route("/").post(saveCalendar);
router.route("/tasks").get(getTasks);
router.route("/tasks").post(addTask);
router.route("/users").get(users);


export default router