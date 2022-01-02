import {
  ProductActionTypes,
  SetFilterCategoriesAction,
  SetFilterCategoriesLoadedAction,
  SetFilterTagsAction,
  SetFilterTagsLoadedAction,
  SetSortingMethodAction,
  SortingMethods,
} from "./productTypes";

export const setFilterTags = (tags: string[]): SetFilterTagsAction => {
  return {
    type: ProductActionTypes.SET_FITLER_TAGS,
    payload: tags,
  };
};

export const setSortingMethod = (
  sortingMethod: SortingMethods
): SetSortingMethodAction => {
  return {
    type: ProductActionTypes.SET_SORTING_METHOD,
    payload: sortingMethod,
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

export const setFilterCategories = (
  categories: string[]
): SetFilterCategoriesAction => {
  return {
    type: ProductActionTypes.SET_FILTER_CATEGORIES,
    payload: categories,
  };
};

export const setFilterCategoriesLoaded = (
  loaded: boolean
): SetFilterCategoriesLoadedAction => {
  return {
    type: ProductActionTypes.SET_FILTER_CATEGORIES_LOADED,
    payload: loaded,
  };
};
