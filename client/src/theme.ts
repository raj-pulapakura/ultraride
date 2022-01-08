import { createTheme } from "@mui/material";

export const brandFont = "Fira Sans";

const colors = {
  royalPurple: "#6500ea",
  sublimeTeal: "#d2ffee",
  orange: "#FF4500",
};

export const theme = createTheme({
  typography: {
    fontFamily: brandFont,
  },
  palette: {
    primary: {
      main: colors.royalPurple,
    },
    secondary: {
      main: colors.orange,
    },
    background: {
      default: "#fff",
      paper: "#fafafaf",
    },
  },
});
