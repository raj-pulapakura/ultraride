import { MenuActionTypes, SetMenuOpenAction } from "./menuTypes";

export const setMenuOpen = (menuIsOpen: boolean): SetMenuOpenAction => {
  return {
    type: MenuActionTypes.SET_MENU_OPEN,
    payload: menuIsOpen,
  };
};
