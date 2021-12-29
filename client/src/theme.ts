import { createTheme } from "@mui/material";

export const primaryFont = "Work Sans";
export const brandFont = "Fira Sans Condensed";

export const theme = createTheme({
  typography: {
    fontFamily: primaryFont,
  },
  palette: {
    primary: {
      main: "#6500EA",
    },
    secondary: {
      main: "#D2FFEE",
    },
    background: {
      default: "#fff",
      paper: "#fafafaf",
    },
  },
});

theme.typography.h3 = {
  fontSize: "1.2rem",
  "@media (min-width:600px)": {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2.4rem",
  },
};
