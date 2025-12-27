import session from "express-session";
import RedisStore from "connect-redis";
import redisClient from "./Redis.js";

const sessionMiddleware = session({
  name: "sid",
  store: new RedisStore({
    client: redisClient,
    prefix: "myapp:sess:",
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
});

export default sessionMiddleware;
