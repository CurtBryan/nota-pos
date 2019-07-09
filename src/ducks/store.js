import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import employeeReducer from './employeeReducer';

const rootReducer = combineReducers({
 employeeReducer 
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));