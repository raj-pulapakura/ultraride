export enum CartActionTypes {
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
  type: CartActionTypes.ADD_ITEM;
  payload: CartItem;
}

export interface DeleteCartItemAction {
  type: CartActionTypes.DELETE_ITEM;
  payload: string;
}

export type CartAction = AddCartItemAction | DeleteCartItemAction;
