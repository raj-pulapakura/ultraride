import React from "react";
import { useSelector } from "react-redux";
import { StoreState } from "../../store";
import { CartItemList } from "./components/CartItemList";
import { Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  continueToCheckoutButton: {
    marginTop: "2rem",
  },
});

interface CartPageProps {}

export const CartPage: React.FC<CartPageProps> = ({}) => {
  const classes = useStyles();

  const cartItems = useSelector<StoreState>(
    (state) => state.cart.items
  ) as StoreState["cart"]["items"];

  // const grandTotal = cartItems.red2uce((acc, curr) => acc.)

  return (
    <>
      {cartItems.length ? (
        <>
          <CartItemList cartItems={cartItems} />
          <Button
            variant="outlined"
            fullWidth
            className={classes.continueToCheckoutButton}
          >
            Continue to Checkout
          </Button>
        </>
      ) : (
        <Typography variant="h5">You have no products in your cart.</Typography>
      )}
    </>
  );
};
