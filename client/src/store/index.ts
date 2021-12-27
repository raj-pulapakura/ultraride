import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { designReducer } from "./design/designReducer";
import { DesignState } from "./design/designTypes";
import { CartState } from "./cart/cartTypes";
import { cartReducer } from "./cart/cartReducer";

export interface StoreState {
  design: DesignState;
  cart: CartState;
}

const rootReducer = combineReducers({
  design: designReducer,
  cart: cartReducer,
});

const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware));

export const store = createStore(rootReducer, middleware);
