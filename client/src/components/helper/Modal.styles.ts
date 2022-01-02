import { makeStyles } from "@mui/styles";

export const useModalStyles = makeStyles({
  modal: {
    position: "fixed",
    width: "max(400px, 40%)",
    left: "50%",
    top: "10%",
    transform: "translateX(-50%)",
    background: "white",
    borderRadius: "0.5rem",
    padding: "1rem",
    zIndex: 5,
    maxHeight: "90vh",
    overflowY: "scroll",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
