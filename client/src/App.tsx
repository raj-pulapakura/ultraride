import "./App.css";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "@mui/material";
import { Provider as ReduxProvider } from "react-redux";
import { theme } from "./theme";
import { AppRouter } from "./AppRouter";
import { store } from "./store";

import { Elements as StripeProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_PUBLIC_KEY } from "./constants";

export const stripePromise = loadStripe(
  STRIPE_PUBLIC_KEY
)

function App() {
  const queryClient = new QueryClient();

  return (
    <StripeProvider stripe={stripePromise}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <ReduxProvider store={store}>
            <AppRouter />
          </ReduxProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </StripeProvider>
  );
}

export default App;
