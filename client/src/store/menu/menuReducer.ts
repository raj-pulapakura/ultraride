import {
  MenuAction,
  MenuState,
  MenuActionTypes,
  SetMenuOpenAction,
  SetMenuLinksAction,
} from "./menuTypes";

const initialState: MenuState = {
  menuIsOpen: false,
  menuLinks: [],
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
    case MenuActionTypes.SET_MENU_LINKS:
      const menuLinks = action.payload as SetMenuLinksAction["payload"];
      return {
        ...state,
        menuLinks,
      };
    default:
      return state;
  }
};
