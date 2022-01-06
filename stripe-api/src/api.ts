import express from "express";
import { createStripeCheckoutSession } from "./checkout";

export const app = express();

app.use(express.json());

// Error catching middleware
app.use((req, res, next) => {
  try {
    next();
  } catch (e) {
    console.log({ e });
    res.status(500).send("Internal server error.");
  }
});

// Checkouts
app.post("/checkout", async (req, res) => {
  res.send(await createStripeCheckoutSession(req.body.line_items));
});
