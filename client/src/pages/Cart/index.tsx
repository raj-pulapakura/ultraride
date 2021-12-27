import React from "react";
import { useSelector } from "react-redux";
import { StoreState } from "../../store";
import { CartItemList } from "./components/CartItemList";
import { Typography } from "@mui/material";

interface CartPageProps {}

export const CartPage: React.FC<CartPageProps> = ({}) => {
  const cartItems = useSelector<StoreState>(
    (state) => state.cart.items
  ) as StoreState["cart"]["items"];

  return (
    <>
      {cartItems.length ? (
        <CartItemList cartItems={cartItems} />
      ) : (
        <Typography variant="h5">You have no products in your cart.</Typography>
      )}
    </>
  );
};
