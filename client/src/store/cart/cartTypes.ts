export enum CartActionTypes {
  ADD_ITEM = "ADD_ITEM",
  DELETE_ITEM = "DELETE_ITEM",
  CLEAR_CART = "CLEAR_CART",
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export interface AddCartItemAction {
  type: CartActionTypes.ADD_ITEM;
  payload: CartItem;
}

export interface DeleteCartItemAction {
  type: CartActionTypes.DELETE_ITEM;
  payload: string;
}

export interface ClearCartAction {
  type: CartActionTypes.CLEAR_CART;
}

export type CartAction =
  | AddCartItemAction
  | DeleteCartItemAction
  | ClearCartAction;
