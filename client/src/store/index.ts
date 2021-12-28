import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { menuReducer } from "./menu/menuReducer";
import { MenuState } from "./menu/menuTypes";
import { CartState } from "./cart/cartTypes";
import { cartReducer } from "./cart/cartReducer";

export interface StoreState {
  menu: MenuState;
  cart: CartState;
}

const rootReducer = combineReducers({
  menu: menuReducer,
  cart: cartReducer,
});

const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware));

export const store = createStore(rootReducer, middleware);
