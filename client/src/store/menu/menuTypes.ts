export enum MenuActionTypes {
  SET_MENU_OPEN = "SET_MENU_OPEN",
  SET_MENU_LINKS = "SET_MENU_LINKS",
}

export interface MenuLink {
  text: string;
  to: string;
  iconPrimary: JSX.Element;
  iconWhite: JSX.Element;
}

export interface MenuState {
  menuIsOpen: boolean;
  menuLinks: Array<MenuLink>;
}

export interface SetMenuOpenAction {
  type: MenuActionTypes.SET_MENU_OPEN;
  payload: boolean;
}

export interface SetMenuLinksAction {
  type: MenuActionTypes;
  payload: Array<MenuLink>;
}

export type MenuAction = SetMenuOpenAction | SetMenuLinksAction;
