export enum CART_TYPES {
  ADD_ITEM = "ADD_ITEM",
  DELETE_ITEM = "DELETE_ITEM",
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export interface AddCartItemAction {
  type: CART_TYPES.ADD_ITEM;
  payload: CartItem;
}

export interface DeleteCartItemAction {
  type: CART_TYPES.DELETE_ITEM;
  payload: string;
}

export type CartAction = AddCartItemAction | DeleteCartItemAction;
