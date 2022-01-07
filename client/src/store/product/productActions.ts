import {
  ProductActionTypes,
  SetFeaturedProductIdAction,
  SetFeaturedProductIdLoadedAction,
  SetFilterTagsDataAction,
  SetFilterTagsLoadedAction,
  SetSortingMethodAction,
  SortingMethods,
} from "./productTypes";

export const setSortingMethod = (
  sortingMethod: SortingMethods
): SetSortingMethodAction => {
  return {
    type: ProductActionTypes.SET_SORTING_METHOD,
    payload: sortingMethod,
  };
};

export const setFilterTags = (tags: string[]): SetFilterTagsDataAction => {
  return {
    type: ProductActionTypes.SET_FITLER_TAGS_DATA,
    payload: tags,
  };
};

export const setFilterTagsLoaded = (
  loaded: boolean
): SetFilterTagsLoadedAction => {
  return {
    type: ProductActionTypes.SET_FILTER_TAGS_LOADED,
    payload: loaded,
  };
};

export const setFeaturedProductId = (
  productId: string
): SetFeaturedProductIdAction => {
  return {
    type: ProductActionTypes.SET_FEATURED_PRODUCT_ID,
    payload: productId,
  };
};

export const setFeaturedProductIdLoaded = (
  loaded: boolean
): SetFeaturedProductIdLoadedAction => {
  return {
    type: ProductActionTypes.SET_FEATURED_PRODUCT_ID_LOADED,
    payload: loaded,
  };
};
