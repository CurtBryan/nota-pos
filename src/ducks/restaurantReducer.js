import axios from "axios";
import { bindActionCreators } from "redux";

const initialState = {
  menu: [],
  employees: [],
  currentEmployeeName: null,
  currentEmployeePos: null
};

const SET_MENU = "SET_MENU";
const SET_EMPLOYEES = "SET_EMPLOYEES";
const SET_CURRENTEMPLOYEE = "SET_CURRENTEMPLOYEE";

export const setEmployees = restaurant => {
  const employees = axios
    .get(`/api/employees/${restaurant}`)
    .then(res => res.data);
  return {
    type: SET_EMPLOYEES,
    payload: employees
  };
};

export const setMenu = restaurant => {
  const menu = axios.get(`/api/menu/${restaurant}`).then(res => res.data);
  return {
    type: SET_MENU,
    payload: menu
  };
};

export const selectEmployee = (restaurant, pin) => {
  const employee = axios
    .get("/api/employee", {
      restaurant: restaurant,
      pin: pin
    })
    .then(res => res.data);
  return {
    type: SET_CURRENTEMPLOYEE,
    payload: employee
  };
};

export default function reducet(state = initialState, action) {
  switch (action.type) {
    case SET_EMPLOYEES + "_FULFILLED":
      return {
        ...state,
        employees: action.payload
      };
    case SET_MENU + "_FULFILLED":
      return {
        ...state,
        menu: action.payload
      };
    case SET_CURRENTEMPLOYEE + "_FULFILLED":
      return {
        ...state,
        currentEmployeeName: action.payload.name,
        currentEmployeePos: action.payload.position
      };
    default:
      return state;
  }
}
