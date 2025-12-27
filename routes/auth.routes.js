import { Router } from "express";
import passport from "passport";
import {
  register,
  login,
  logout,
  me,
  googleCallback,
} from "../controllers/auth.controller.js";

const router = Router();

/**
 * Manual auth
 */
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", me);

/**
 * Google OAuth
 */
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: true,
  }),
  googleCallback
);

export default router;
