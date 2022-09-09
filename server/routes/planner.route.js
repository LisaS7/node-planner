import express from "express"
const router = express.Router()

// Functions
import {calendar, tasks, users} from '../controllers.js'

router.route("/").get(calendar);
router.route("/tasks").get(tasks);
router.route("/users").get(users);


export default router