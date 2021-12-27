import { DesignAction, DesignState, DesignTypes } from "./designTypes";

const initialState: DesignState = {
  menuIsOpen: false,
};

export const designReducer = (
  state: DesignState = initialState,
  action: DesignAction
): DesignState => {
  const { type } = action;
  let payload = action.payload;
  switch (type) {
    case DesignTypes.SET_MENU_OPEN:
      payload = action.payload;
      return {
        ...state,
        menuIsOpen: payload,
      };
    default:
      return state;
  }
};
