import {
  MenuAction,
  MenuState,
  MenuActionTypes,
  SetMenuOpenAction,
} from "./menuTypes";

const initialState: MenuState = {
  menuIsOpen: false,
};

export const menuReducer = (
  state: MenuState = initialState,
  action: MenuAction
): MenuState => {
  const { type } = action;
  switch (type) {
    case MenuActionTypes.SET_MENU_OPEN:
      const menuIsOpen = action.payload as SetMenuOpenAction["payload"];
      return {
        ...state,
        menuIsOpen,
      };
    default:
      return state;
  }
};
