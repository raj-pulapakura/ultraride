import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { menuReducer } from "./menu/menuReducer";
import { MenuState } from "./menu/menuTypes";
import { CartState } from "./cart/cartTypes";
import { cartReducer } from "./cart/cartReducer";
import { ProductState } from "./product/productTypes";
import { productReducer } from "./product/productReducer";

export interface StoreState {
  menu: MenuState;
  cart: CartState;
  product: ProductState;
}

const rootReducer = combineReducers({
  menu: menuReducer,
  cart: cartReducer,
  product: productReducer,
});

const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware));

export const store = createStore(rootReducer, middleware);
