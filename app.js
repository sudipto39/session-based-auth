// app.js
import express from "express";
import sessionMiddleware from "./config/session.js";
import passport from "./config/passport.js";
import authRouter from "./routes/auth.routes.js";

const app = express();

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sessions (backed by Redis)
app.use(sessionMiddleware);

// Passport (must come after sessions)
app.use(passport.initialize());
app.use(passport.session());

// Auth routes (local + Google)
app.use("/auth", authRouter);

// Example test route
function requireAuth(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  next();
}

app.get("/dashboard", requireAuth, (req, res) => {
  res.send("Welcome to dashboard, userId = " + req.session.userId);
});

export default app;
