import Stripe from "stripe";
import { app } from "./api";

// Export Stripe client
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2020-08-27",
});

const port = process.env.PORT || 80;
app.listen(port, () => console.log("stripe-api listening"));
