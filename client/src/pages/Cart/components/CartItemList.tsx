import { Grid } from "@mui/material";
import React from "react";
import { CartItem } from "../../../store/cart/cartTypes";
import { SingleCartItem } from "./SingleCartItem";

interface CartItemListProps {
  cartItems: CartItem[];
}

export const CartItemList: React.FC<CartItemListProps> = ({ cartItems }) => {
  return (
    <Grid container>
      {cartItems.map((cartItem) => (
        <Grid item xs={12}>
          <SingleCartItem key={cartItem.productId} cartItem={cartItem} />
        </Grid>
      ))}
    </Grid>
  );
};
