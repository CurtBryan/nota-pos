import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import restaurantReducer from "./restaurantReducer";
import ticketReducer from "./ticketReducer";
import  userReducer  from "./userReducer";

const rootReducer = combineReducers({
  restaurantInfo: restaurantReducer,
  tickets: ticketReducer,
  userInfo: userReducer
});

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));
