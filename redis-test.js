import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

console.log("RAW REDIS_URL:", JSON.stringify(process.env.REDIS_URL));

import { createClient } from "redis";

const client = createClient({ url: process.env.REDIS_URL });

client.on("error", (err) => console.error("Redis error:", err));

const run = async () => {
  await client.connect();
  console.log("PING ->", await client.ping());
  await client.quit();
};

run();
