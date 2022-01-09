import { createTheme } from "@mui/material";

export const brandFont = "Fira Sans";

const colors = {
  royalPurple: "#6500ea",
};

export const theme = createTheme({
  typography: {
    fontFamily: brandFont,
  },
  palette: {
    primary: {
      main: "#6500ea",
    },
    secondary: {
      main: "#ca13eb",
    },
    background: {
      default: "#fff",
      paper: "#fafafaf",
    },
  },
});
