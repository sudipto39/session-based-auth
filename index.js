import dotenv from "dotenv";
dotenv.config({path:"./.env"});

import app from "./app.js";
import connectDB from "./config/db.js";
import redisClient from "./config/Redis.js";

const PORT = process.env.PORT;

const startServer = async () => {
  try {
    await connectDB();
    await redisClient.connect();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();
