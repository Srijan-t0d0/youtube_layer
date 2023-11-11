import { Router } from "express";
import {
  loginUser,
  registerUser,
  googleAuth,
  googleAuthCallback,
  googleAuthCallbackRedirect,
} from "../controllers/auth.controller.js";

import { exists_in_db_check } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("hello auth");
});
router.route("/login").post(loginUser);
router.route("/signup").post(registerUser);

// Google authentication routes
router.get("/google", googleAuth);
router.get("/google/callback", googleAuthCallback, googleAuthCallbackRedirect);

export default router;
