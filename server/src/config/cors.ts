import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Set-Cookie"],
};
