import { makeStyles } from "@mui/styles";

export const useModalStyles = makeStyles({
  modal: {
    zIndex: 5,
    top: "10%",
    left: "50%",
    padding: "2rem",
    position: "fixed",
    maxHeight: "80vh",
    overflowY: "auto",
    background: "white",
    borderRadius: "0.2rem",
    width: "clamp(40%, 500px, 90%)",
    transform: "translateX(-50%)",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
