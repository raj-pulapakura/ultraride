import {
  ProductAction,
  ProductActionTypes,
  ProductState,
  SortingMethods,
} from "./productTypes";

const initialState: ProductState = {
  filterTags: [],
  filterTagsLoaded: false,
  filterCategories: [],
  filterCategoriesLoaded: false,
  sortingMethod: SortingMethods.NO_SORT,
};

export const productReducer = (
  state: ProductState = initialState,
  action: ProductAction
): ProductState => {
  const { type } = action;
  switch (type) {
    case ProductActionTypes.SET_FITLER_TAGS:
      return {
        ...state,
        filterTags: action.payload,
      };
    case ProductActionTypes.SET_SORTING_METHOD:
      return {
        ...state,
        sortingMethod: action.payload,
      };
    case ProductActionTypes.SET_FILTER_TAGS_LOADED:
      return {
        ...state,
        filterTagsLoaded: action.payload,
      };
    case ProductActionTypes.SET_FILTER_CATEGORIES:
      return {
        ...state,
        filterCategories: action.payload,
      };
    case ProductActionTypes.SET_FILTER_CATEGORIES_LOADED:
      return {
        ...state,
        filterCategoriesLoaded: action.payload,
      };
    default:
      return state;
  }
};
