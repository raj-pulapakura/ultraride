import Stripe from "stripe";
import { stripe } from ".";

export async function createStripeCheckoutSession(
  line_items: Stripe.Checkout.SessionCreateParams.LineItem[]
) {
  const url = process.env.WEBAPP_DOMAIN;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    success_url: `${url}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${url}/checkout/failed`,
  });

  return session;
}
