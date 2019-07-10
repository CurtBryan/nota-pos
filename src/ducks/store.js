import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import restaurantReducer from "./restaurantReducer";

const rootReducer = combineReducers({
  restaurantInfo: restaurantReducer
});

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));
