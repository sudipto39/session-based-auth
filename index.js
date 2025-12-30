// index.js
import dotenv from "dotenv";
dotenv.config({ path: "./.env"});

import app from "./app.js";
import connectDB from "./config/db.js";
// import redisClient, { initRedis } from "./config/redis.js";
import redisClient from "./config/redis.js";

const PORT = process.env.PORT;

const startServer = async () => {
  try {
    // 1. Hard dependency: MongoDB
    await connectDB();

    // 2. Soft dependency: Redis for sessions
    // try {
    //   await initRedis();
    // } catch (redisErr) {
    //   console.error("Redis unavailable. Sessions will not persist.");
    //   console.error(redisErr);
    // }

    // 3. Start HTTP server
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    // 4. Graceful shutdown
    const shutdown = async (signal) => {
      console.log(`\n${signal} received. Shutting down...`);
      server.close(async () => {
        if (redisClient.isOpen) {
          await redisClient.quit();
          console.log("Redis disconnected");
        }
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (err) {
    console.error("Startup failed:", err);
    process.exit(1);
  }
};

startServer();
