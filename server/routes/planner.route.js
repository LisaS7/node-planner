import express from "express"
const router = express.Router()

// Functions
import {calendar, options} from '../controllers.js'

router.route("/").get(calendar);
router.route("/options").get(options);

export default router