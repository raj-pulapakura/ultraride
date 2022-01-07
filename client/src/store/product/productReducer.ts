import {
  ProductAction,
  ProductActionTypes,
  ProductState,
  SortingMethods,
} from "./productTypes";

const initialState: ProductState = {
  filterTags: {
    data: [],
    loaded: false,
  },
  featuredProductId: {
    data: "",
    loaded: false,
  },
  sortingMethod: SortingMethods.NO_SORT,
};

export const productReducer = (
  state: ProductState = initialState,
  action: ProductAction
): ProductState => {
  const { type } = action;
  switch (type) {
    case ProductActionTypes.SET_FITLER_TAGS_DATA:
      return {
        ...state,
        filterTags: {
          ...state.filterTags,
          data: action.payload,
        },
      };
    case ProductActionTypes.SET_FILTER_TAGS_LOADED:
      return {
        ...state,
        filterTags: {
          ...state.filterTags,
          loaded: action.payload,
        },
      };
    case ProductActionTypes.SET_FEATURED_PRODUCT_ID:
      return {
        ...state,
        featuredProductId: {
          ...state.featuredProductId,
          data: action.payload,
        },
      };
    case ProductActionTypes.SET_FEATURED_PRODUCT_ID_LOADED:
      return {
        ...state,
        featuredProductId: {
          ...state.featuredProductId,
          loaded: action.payload,
        },
      };
    case ProductActionTypes.SET_SORTING_METHOD:
      return {
        ...state,
        sortingMethod: action.payload,
      };
    default:
      return state;
  }
};
