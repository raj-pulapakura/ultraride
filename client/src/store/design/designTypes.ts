export enum DesignTypes {
  SET_MENU_OPEN = "SET_MENU_OPEN",
}

export interface DesignState {
  menuIsOpen: boolean;
}

export interface SetMenuOpenAction {
  type: DesignTypes.SET_MENU_OPEN;
  payload: boolean;
}

export type DesignAction = SetMenuOpenAction;
