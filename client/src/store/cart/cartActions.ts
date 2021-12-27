import {
  AddCartItemAction,
  CartItem,
  CART_TYPES,
  DeleteCartItemAction,
} from "./cartTypes";

export const addCartItem = (cartItem: CartItem): AddCartItemAction => {
  return {
    type: CART_TYPES.ADD_ITEM,
    payload: cartItem,
  };
};

export const deleteCartItem = (
  productIdToDelete: string
): DeleteCartItemAction => {
  return {
    type: CART_TYPES.DELETE_ITEM,
    payload: productIdToDelete,
  };
};
