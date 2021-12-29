import {
  ProductAction,
  ProductActionTypes,
  ProductState,
} from "./productTypes";

const initialState: ProductState = {
  products: [],
};

export const productReducer = (
  state: ProductState = initialState,
  action: ProductAction
): ProductState => {
  const { type } = action;
  switch (type) {
    case ProductActionTypes.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};
