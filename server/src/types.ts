import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import { RedisClient } from "redis";

export type EnvironmentVariables = {
  REDIS_PORT: number;
  REDIS_HOST: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_DATABASE: string;
} & NodeJS.ProcessEnv;

export interface Context {
  req: Request & {
    session: Session & Partial<SessionData> & { accountId: string };
  };
  res: Response;
  redis: RedisClient;
}
