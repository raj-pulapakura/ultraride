import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Set-Cookie"],
  origin: ["http://localhost:3000", "https://studio.apollographql.com"],
};
