export enum ProductActionTypes {
  SET_FITLER_TAGS = "SET_FILTER_TAGS",
  SET_FILTER_TAGS_LOADED = "SET_FILTER_TAGS_LOADED",
  SET_FILTER_CATEGORIES = "SET_FILTER_CATEGORIES",
  SET_FILTER_CATEGORIES_LOADED = "SET_FILTER_CATEGORIES_LOADED",
  SET_SORTING_METHOD = "SET_SORTING_METHOD",
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

export interface SetFilterCategoriesAction {
  type: ProductActionTypes.SET_FILTER_CATEGORIES;
  payload: ProductState["filterCategories"];
}

export interface SetFilterCategoriesLoadedAction {
  type: ProductActionTypes.SET_FILTER_CATEGORIES_LOADED;
  payload: ProductState["filterCategoriesLoaded"];
}

export type ProductAction =
  | SetFilterTagsAction
  | SetSortingMethodAction
  | SetFilterTagsLoadedAction
  | SetFilterCategoriesAction
  | SetFilterCategoriesLoadedAction;
