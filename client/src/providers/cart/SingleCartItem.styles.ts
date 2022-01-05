import { makeStyles } from "@mui/styles";

export const useSingleCartItemStyles = makeStyles({
  productBox: {
    display: "flex",
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  productDetails: {
    padding: "1rem",
    paddingTop: "0",
  },
  productCategory: {
    color: "grey",
  },
  productImage: {
    width: "50%",
    borderRadius: "1rem",
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
