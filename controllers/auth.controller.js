import bcrypt from "bcrypt";
import User from "../models/user.model.js";

/**
 * Register user
 */
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
};

/**
 * Login user (manual)
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
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
        return res.status(500).json({ message: "Session error" });
      }

      req.session.userId = user._id;

      res.json({
        message: "Login successful",
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};

/**
 * Google OAuth success callback
 * (Passport puts user on req.user)
 */
export const googleCallback = (req, res) => {
  const user = req.user;

  req.session.regenerate((err) => {
    if (err) {
      return res.redirect("/login?error=session");
    }

    req.session.userId = user._id;

    res.redirect("/dashboard");
  });
};

/**
 * Logout user
 */
export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }

    res.clearCookie("sid");
    res.json({ message: "Logged out successfully" });
  });
};

/**
 * Get current logged-in user
 */
export const me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const user = await User.findById(req.session.userId).select("-password");
  res.json(user);
};
