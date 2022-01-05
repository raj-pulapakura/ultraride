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
  featuredProductId: "",
  featuredProductIdLoaded: false,
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
    case ProductActionTypes.SET_FEATURED_PRODUCT_ID:
      return {
        ...state,
        featuredProductId: action.payload,
      };
    case ProductActionTypes.SET_FEATURED_PRODUCT_ID_LOADED:
      return {
        ...state,
        featuredProductIdLoaded: action.payload,
      };
    default:
      return state;
  }
};
