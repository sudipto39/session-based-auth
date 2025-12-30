// app.js
import express from "express";
import sessionMiddleware from "./config/session.js";
// later: import passport from "passport";
// and your Google OAuth routes

const app = express();

// Body parsers 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sessions (backed by Redis)
app.use(sessionMiddleware);

// later: app.use(passport.initialize());
// later: app.use(passport.session());

// Example test route
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

export default app;
