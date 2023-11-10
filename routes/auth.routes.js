import { Router } from "express"

import { loginUser, registerUser } from "../controllers/auth.controller.js"
import { exists_in_db_check } from "../middlewares/auth.middleware.js"

const router = Router()


router.route("/login").post(exists_in_db_check, loginUser)
router.route("/signup").post(registerUser)

export default router