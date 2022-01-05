import { Context } from "../types";

export const adminIsLoggedIn = (req: Context["req"]) => {
  return req.session.adminLoggedIn;
};
