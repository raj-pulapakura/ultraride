import { makeStyles } from "@mui/styles";
import { theme } from "../../theme";

export const useMenuStyles = makeStyles({
  drawer: {
    width: "70vw",
    background: "white",
  },
  drawerPaper: {
    width: "70vw",
    background: "white",
  },
  mainBox: {
    width: "100%",
    position: "relative",
    padding: "2rem",
  },
  closeButton: {
    position: "absolute",
    width: "fit-content",
    top: 5,
    right: 5,
  },
  menuLinkContainer: {
    padding: "2rem",
  },
  menuLink: {
    textDecoration: "none",
    color: "black",
    marginBottom: "0.25rem",
  },
  menuLinkBox: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    marginBottom: "1rem",
  },
});
