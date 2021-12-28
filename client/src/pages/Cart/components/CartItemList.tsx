import React from "react";
import { CartItem } from "../../../store/cart/cartTypes";
import { SingleCartItem } from "./SingleCartItem";

interface CartItemListProps {
  cartItems: CartItem[];
}

export const CartItemList: React.FC<CartItemListProps> = ({ cartItems }) => {
  return (
    <>
      {cartItems.map((cartItem) => (
        <SingleCartItem key={cartItem.productId} cartItem={cartItem} />
      ))}
    </>
  );
};
