import { CartAction, CartItem, CartState, CartActionTypes } from "./cartTypes";

const initialState: CartState = {
  items: [],
};

export const cartReducer = (
  state: CartState = initialState,
  action: CartAction
): CartState => {
  const { type } = action;
  switch (type) {
    case CartActionTypes.ADD_ITEM:
      const { productId, quantity } = action.payload;
      if (state.items.find((item) => item.productId === productId)) {
        return {
          items: state.items.map((item) =>
            item.productId === productId ? { productId, quantity } : item
          ),
        };
      }
      return {
        items: [...state.items, { productId, quantity }],
      };
    case CartActionTypes.DELETE_ITEM:
      const productIdToDelete = action.payload;
      return {
        items: state.items.filter(
          (item) => item.productId !== productIdToDelete
        ),
      };
    default:
      return state;
  }
};
