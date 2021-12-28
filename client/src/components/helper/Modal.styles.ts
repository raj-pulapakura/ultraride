import { makeStyles } from "@mui/styles";

export const useModalStyles = makeStyles({
  modal: {
    position: "fixed",
    width: "clamp(50%, 400px, 90%)",
    left: "50%",
    top: "10%",
    transform: "translateX(-50%)",
    background: "white",
    borderRadius: "1rem",
    padding: "1rem",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
