export enum ProductActionTypes {
  SET_FITLER_TAGS_DATA = "SET_FITLER_TAGS_DATA",
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
  filterTags: {
    data: string[];
    loaded: boolean;
  };
  featuredProductId: {
    data: string;
    loaded: boolean;
  };
  sortingMethod: SortingMethods;
}

export interface SetFilterTagsDataAction {
  type: ProductActionTypes.SET_FITLER_TAGS_DATA;
  payload: ProductState["filterTags"]["data"];
}

export interface SetFilterTagsLoadedAction {
  type: ProductActionTypes.SET_FILTER_TAGS_LOADED;
  payload: ProductState["filterTags"]["loaded"];
}

export interface SetFeaturedProductIdAction {
  type: ProductActionTypes.SET_FEATURED_PRODUCT_ID;
  payload: ProductState["featuredProductId"]["data"];
}

export interface SetFeaturedProductIdLoadedAction {
  type: ProductActionTypes.SET_FEATURED_PRODUCT_ID_LOADED;
  payload: ProductState["featuredProductId"]["loaded"];
}

export interface SetSortingMethodAction {
  type: ProductActionTypes.SET_SORTING_METHOD;
  payload: ProductState["sortingMethod"];
}

export type ProductAction =
  | SetFilterTagsDataAction
  | SetSortingMethodAction
  | SetFilterTagsLoadedAction
  | SetFeaturedProductIdAction
  | SetFeaturedProductIdLoadedAction;
