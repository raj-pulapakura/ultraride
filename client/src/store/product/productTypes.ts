import { GetProductsQuery } from "../../graphql/generated";

export enum ProductActionTypes {
  SET_PRODUCTS = "SET_PRODUCTS",
}

export interface ProductState {
  products: GetProductsQuery["getProducts"];
}

export interface SetProductsAction {
  type: ProductActionTypes.SET_PRODUCTS;
  payload: ProductState["products"];
}

export type ProductAction = SetProductsAction;
