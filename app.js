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
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

export default app;
