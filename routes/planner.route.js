import express from "express"
const router = express.Router()

// Functions
import calendar from '../controllers.js'

router.route("/").get(calendar)

export default router