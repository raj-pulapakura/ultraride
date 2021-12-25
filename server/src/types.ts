export type EnvironmentVariables = {
  REDIS_PORT: number;
  REDIS_HOST: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_DATABASE: string;
} & NodeJS.ProcessEnv;
