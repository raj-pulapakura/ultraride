import { DesignTypes, SetMenuOpenAction } from "./designTypes";

export const setMenuOpen = (menuIsOpen: boolean): SetMenuOpenAction => {
  return {
    type: DesignTypes.SET_MENU_OPEN,
    payload: menuIsOpen,
  };
};
