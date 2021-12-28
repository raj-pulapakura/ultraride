import {
  MenuActionTypes,
  SetMenuOpenAction,
  SetMenuLinksAction,
  MenuLink,
} from "./menuTypes";

export const setMenuOpen = (menuIsOpen: boolean): SetMenuOpenAction => {
  return {
    type: MenuActionTypes.SET_MENU_OPEN,
    payload: menuIsOpen,
  };
};

export const setMenuLinks = (
  menuLinks: Array<MenuLink>
): SetMenuLinksAction => {
  return {
    type: MenuActionTypes.SET_MENU_LINKS,
    payload: menuLinks,
  };
};
