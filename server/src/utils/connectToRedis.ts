import redis from "redis";
import { redisConfig } from "../config/redis";

export const connectToRedis = (): Promise<redis.RedisClient> => {
  return new Promise((resolve, reject) => {
    const redisClient = redis.createClient(redisConfig);

    redisClient.on("connect", () => {
      console.log("connected to cache");
      resolve(redisClient);
    });

    redisClient.on("error", () => {
      reject("redis not available");
    });
  });
};
