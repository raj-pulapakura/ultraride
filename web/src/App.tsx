import "./App.css";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "@mui/material";
import { Provider as ReduxProvider } from "react-redux";
import { theme } from "./theme";
import { AppRouter } from "./AppRouter";
import { store } from "./store";

export const brandName = "ultraride";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <ReduxProvider store={store}>
          <AppRouter />
        </ReduxProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
