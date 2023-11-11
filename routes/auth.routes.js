import { Router } from "express"

import { loginUser, registerUser } from "../controllers/auth.controller.js"
import { exists_in_db_check } from "../middlewares/auth.middleware.js"

const router = Router()

router.get('/' , (req , res) => {
    res.send("hello auth")
})
router.route("/login").post(loginUser)
router.route("/signup").post(registerUser)

export default router