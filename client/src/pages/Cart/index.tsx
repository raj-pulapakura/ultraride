import React from "react";
import { useSelector } from "react-redux";
import { StoreState } from "../../store";
import { CartItemList } from "./components/CartItemList";
import { Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { EmptyCart } from "./components/EmptyCart";
import { useMeQuery, useProductQuery } from "../../graphql/generated";
import { graphqlClient } from "../../graphql/client";
import { useQueries } from "react-query";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  continueToCheckoutButton: {
    marginTop: "2rem",
  },
});

interface CartPageProps {}

export const CartPage: React.FC<CartPageProps> = ({}) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const cartItems = useSelector<StoreState>(
    (state) => state.cart.items
  ) as StoreState["cart"]["items"];

  const { data: meData } = useMeQuery(graphqlClient);

  const onContinueToCheckoutClick = () => {
    if (!meData?.me?.account) {
      navigate("/register?next=cart");
    }
  };

  return (
    <>
      {cartItems.length ? (
        <>
          <CartItemList cartItems={cartItems} />
          <Button
            variant="outlined"
            fullWidth
            className={classes.continueToCheckoutButton}
            onClick={onContinueToCheckoutClick}
          >
            Continue to Checkout
          </Button>
        </>
      ) : (
        <EmptyCart />
      )}
    </>
  );
};
