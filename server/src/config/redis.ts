import { env } from "../constants";
import { ClientOpts } from "redis";

export const redisConfig: ClientOpts = {
  port: env.REDIS_PORT,
  host: env.REDIS_HOST,
};
