import {
  AddCartItemAction,
  CartItem,
  CartActionTypes,
  DeleteCartItemAction,
  ClearCartAction,
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

export const clearCart = (): ClearCartAction => {
  return {
    type: CartActionTypes.CLEAR_CART,
  };
};
