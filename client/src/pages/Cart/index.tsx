import React from "react";
import { CartItemList } from "../../providers/cart/CartItemList";
import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { EmptyCart } from "../../providers/cart/EmptyCart";
import { useMeQuery } from "../../graphql/generated";
import { graphqlClient } from "../../graphql/client";
import { useNavigate } from "react-router-dom";
import { useCartItemProducts } from "../../hooks/useCartItemProducts";
import { useSelector } from "react-redux";
import { StoreState } from "../../store";

const useStyles = makeStyles({
  continueToCheckoutButton: {
    marginTop: "2rem",
  },
});

interface CartPageProps {}

export const CartPage: React.FC<CartPageProps> = ({}) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { data: meData } = useMeQuery(graphqlClient);

  const cartItemProducts = useCartItemProducts();

  const totalCost = cartItemProducts.reduce((acc, curr) => {
    if (curr?.quantity && curr?.product?.price) {
      return acc + curr.quantity * curr.product.price;
    }
    return acc;
  }, 0);

  const cartItems = useSelector<StoreState>(
    (state) => state.cart.items
  ) as StoreState["cart"]["items"];

  const onContinueToCheckoutClick = () => {
    if (!meData?.me?.account) {
      navigate("/register?next=cart");
    }
  };

  return (
    <>
      {cartItemProducts.length ? (
        <Box sx={{ width: "min(600px, 100%)", margin: "auto" }}>
          <Typography
            variant="h5"
            fontWeight="bold"
          >{`Total Cost: $${totalCost}`}</Typography>
          <CartItemList cartItems={cartItems} />
          <Button
            variant="outlined"
            fullWidth
            className={classes.continueToCheckoutButton}
            onClick={onContinueToCheckoutClick}
            sx={{ marginTop: "1rem" }}
          >
            Continue to Checkout
          </Button>
        </Box>
      ) : (
        <EmptyCart />
      )}
    </>
  );
};
