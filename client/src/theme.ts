import { createTheme } from "@mui/material";

export const primaryFont = "Work Sans";
export const brandFont = "Fira Sans Condensed";

const colors = {
  royalPurple: "#6500ea",
  sublimeTeal: "#d2ffee",
};

export const theme = createTheme({
  typography: {
    fontFamily: brandFont,
  },
  palette: {
    primary: {
      main: "#000",
    },
    secondary: {
      main: colors.royalPurple,
    },
    background: {
      default: "#fff",
      paper: "#fafafaf",
    },
  },
});
