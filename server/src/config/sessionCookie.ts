import { SessionOptions } from "express-session";
import { TEN_YEARS } from "../constants";

export const sessionCookieConfig: SessionOptions["cookie"] = {
  httpOnly: true,
  secure: false,
  maxAge: TEN_YEARS,
  sameSite: "lax",
};
