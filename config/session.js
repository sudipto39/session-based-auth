// config/session.js
import session from "express-session";
import { RedisStore } from "connect-redis";
import redisClient from "./redis.js"; 

const ONE_DAY = 1000 * 60 * 60 * 24;

const sessionMiddleware = session({
  name: "sid",
  store: new RedisStore({
    client: redisClient,
    prefix: "myapp:sess:",
    ttl: ONE_DAY / 1000, // seconds
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: ONE_DAY,
  },
});

export default sessionMiddleware;
