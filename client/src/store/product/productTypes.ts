import { ProductsQuery } from "../../graphql/generated";

export enum ProductActionTypes {
  SET_FITLER_TAGS = "SET_FILTER_TAGS",
  SET_FILTER_TAGS_LOADED = "SET_FILTER_TAGS_LOADED",
  SET_SORTING_METHOD = "SET_SORTING_METHOD",
  SET_FEATURED_PRODUCT_ID = "SET_FEATURED_PRODUCT_ID",
  SET_FEATURED_PRODUCT_ID_LOADED = "SET_FEATURED_PRODUCT_ID_LOADED",
}

export enum SortingMethods {
  NO_SORT = "No Sort",
  SORT_BY_PRICE = "Sort By Price",
  SORT_BY_NAME = "Sort By Name",
}

export interface ProductState {
  filterTags: string[];
  filterTagsLoaded: boolean;
  filterCategories: string[];
  filterCategoriesLoaded: boolean;
  sortingMethod: SortingMethods;
  featuredProductId: string;
  featuredProductIdLoaded: boolean;
}

export interface SetFilterTagsAction {
  type: ProductActionTypes.SET_FITLER_TAGS;
  payload: ProductState["filterTags"];
}

export interface SetSortingMethodAction {
  type: ProductActionTypes.SET_SORTING_METHOD;
  payload: ProductState["sortingMethod"];
}

export interface SetFilterTagsLoadedAction {
  type: ProductActionTypes.SET_FILTER_TAGS_LOADED;
  payload: ProductState["filterTagsLoaded"];
}

export interface SetFeaturedProductIdAction {
  type: ProductActionTypes.SET_FEATURED_PRODUCT_ID;
  payload: ProductState["featuredProductId"];
}

export interface SetFeaturedProductIdLoadedAction {
  type: ProductActionTypes.SET_FEATURED_PRODUCT_ID_LOADED;
  payload: ProductState["featuredProductIdLoaded"];
}

export type ProductAction =
  | SetFilterTagsAction
  | SetSortingMethodAction
  | SetFilterTagsLoadedAction
  | SetFeaturedProductIdAction
  | SetFeaturedProductIdLoadedAction;
