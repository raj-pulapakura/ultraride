import { makeStyles } from "@mui/styles";

export const useNavbarStyles = makeStyles({
  navbar: {
    background: "#000",
    padding: "1rem 2rem",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 100,
    boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.5)",
  },
  brand: {
    color: "white",
  },
});
