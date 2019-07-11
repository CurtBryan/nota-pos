import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import restaurantReducer from "./restaurantReducer";
import ticketReducer from "./ticketReducer";

const rootReducer = combineReducers({
  restaurantInfo: restaurantReducer,
  tickets: ticketReducer
});

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));
