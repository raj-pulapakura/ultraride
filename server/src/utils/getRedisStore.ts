import { RedisClient } from "redis";

export const getRedisStore = (redisClient: RedisClient, key: string) => {
  return new Promise((resolve, reject) =>
    redisClient.get(key, (error, reply) => {
      if (error) {
        return reject(error);
      }
      return resolve(reply);
    })
  );
};
