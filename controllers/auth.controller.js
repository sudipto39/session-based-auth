// controllers/auth.controller.js
import bcrypt from "bcrypt";
import User from "../models/user.model.js";

/**
 * Register user (manual signup)
 */
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Basic example; you can add stricter validation
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      // googleId: undefined  // user is local-only at this point
    });

    return res.status(201).json({
      message: "User registered successfully",
      userId: user._id,
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: "Registration failed" });
  }
};

/**
 * Login user (manual)
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find local or hybrid (local + Google) user by email
    const user = await User.findOne({ email });

    // Either no user or user has no password (Google-only account)
    if (!user || !user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Prevent session fixation
    req.session.regenerate((err) => {
      if (err) {
        console.error("Session regenerate error (login):", err);
        return res.status(500).json({ message: "Session error" });
      }

      // Minimal session payload; same for Google and local
      req.session.userId = user._id;

      return res.json({
        message: "Login successful",
      });
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Login failed" });
  }
};

/**
 * Google OAuth success callback
 * (Passport puts user on req.user, after find-or-create in the strategy)
 */
export const googleCallback = (req, res) => {
  const user = req.user;

  if (!user) {
    // Should not normally happen if passport.authenticate succeeded
    return res.redirect("/login?error=oauth");
  }

  req.session.regenerate((err) => {
    if (err) {
      console.error("Session regenerate error (google):", err);
      return res.redirect("/login?error=session");
    }

    // Keep the same session shape as manual login
    req.session.userId = user._id;

    return res.redirect("/dashboard");
  });
};

/**
 * Logout user (works for local + Google sessions)
 */
export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ message: "Logout failed" });
    }

    res.clearCookie("sid");
    return res.json({ message: "Logged out successfully" });
  });
};

/**
 * Get current logged-in user (for both local + Google)
 */
export const me = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await User.findById(req.session.userId).select("-password");
    if (!user) {
      // Session refers to a deleted user
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    console.error("Me endpoint error:", error);
    return res.status(500).json({ message: "Failed to fetch user" });
  }
};
