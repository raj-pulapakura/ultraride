import { makeStyles } from "@mui/styles";

export const useSingleCartItemStyles = makeStyles({
  productBox: {
    display: "flex",
    marginTop: "1rem",
    marginBottom: "1rem",
    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.25)",
    borderRadius: "0.5rem",
  },
  productDetails: {
    padding: "1rem",
    position: "relative",
    width: "100%",
  },
  productCategory: {
    color: "grey",
  },
  productImage: {
    maxWidth: "min(250px, 50%)",
    borderTopLeftRadius: "0.5rem",
    borderBottomLeftRadius: "0.5rem",
  },
  controls: {
    display: "flex",
    flexDirection: "row",
    gap: "0.5rem",
    marginTop: "1rem",
  },
  controlButton: {
    borderRadius: "5px",
    border: "none",
    padding: "0.25rem",
    backgroundColor: "black",
  },
});
