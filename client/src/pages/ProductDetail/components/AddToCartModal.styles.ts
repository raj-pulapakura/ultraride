import { makeStyles } from "@mui/styles";

export const useAddToCartModalStyles = makeStyles({
  alreadyInCart: {
    color: "green",
  },
  productBox: {
    display: "flex",
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  productDetails: {
    padding: "1rem",
  },
  productCategory: {
    color: "grey",
  },
  productImage: {
    width: "40%",
    borderRadius: "1rem",
  },
  quantityInput: {},
  addToCartButton: {
    marginTop: "1rem",
  },
});
