import express from "express";
import sessionMiddleware from "./config/session.js";

const app = express();

app.use(sessionMiddleware);

export default app;
