import {
  AddCartItemAction,
  CartItem,
  CartActionTypes,
  DeleteCartItemAction,
} from "./cartTypes";

export const addCartItem = (cartItem: CartItem): AddCartItemAction => {
  return {
    type: CartActionTypes.ADD_ITEM,
    payload: cartItem,
  };
};

export const deleteCartItem = (
  productIdToDelete: string
): DeleteCartItemAction => {
  localStorage.removeItem(productIdToDelete);
  return {
    type: CartActionTypes.DELETE_ITEM,
    payload: productIdToDelete,
  };
};
