import { makeStyles } from "@mui/styles";
import { theme } from "../../../theme";

export const useNavbarStyles = makeStyles({
  navbar: {
    background: theme.palette.primary.main,
    padding: "1rem 2rem",
  },
  navbarInner: {},
  brand: {
    color: "white",
  },
});
