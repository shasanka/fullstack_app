import config from "@/config/config";
import { createClient } from "redis";

let redisClient: ReturnType<typeof createClient>;

export async function initializeRedis(): Promise<void> {
  try {
    redisClient = await createClient({
        url:config.REDIS_URL
    });

    redisClient.on("error", (err) => console.error("Redis Client Error", err));

    await redisClient.connect();
    console.log("Connected to Redis");
  } catch (err) {
    console.error("Failed to connect to Redis:", err);
    throw err; // Re-throw the error for proper handling
  }
}

export { redisClient };