import {
  ProductActionTypes,
  ProductState,
  SetProductsAction,
} from "./productTypes";

export const setProducts = (
  products: ProductState["products"]
): SetProductsAction => {
  return {
    type: ProductActionTypes.SET_PRODUCTS,
    payload: products,
  };
};
