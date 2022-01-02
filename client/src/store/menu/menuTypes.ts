export enum MenuActionTypes {
  SET_MENU_OPEN = "SET_MENU_OPEN",
}

export interface MenuState {
  menuIsOpen: boolean;
}

export interface SetMenuOpenAction {
  type: MenuActionTypes.SET_MENU_OPEN;
  payload: boolean;
}


export type MenuAction = SetMenuOpenAction;
