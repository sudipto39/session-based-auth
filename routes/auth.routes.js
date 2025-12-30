// routes/auth.routes.js
import { Router } from "express";
import passport from "../config/passport.js";
import {
  register,
  login,
  googleCallback,
  logout,
  me,
} from "../controllers/auth.controller.js";

const router = Router();

// Local auth
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", me);

// Google OAuth: start flow
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth: callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  googleCallback
);

export default router;
