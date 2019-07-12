import axios from "axios";

const initialState = {
  menu: [],
  employees: [],
  currentEmployeeName: null,
  currentEmployeePos: null
};

const SET_MENU = "SET_MENU";
const SET_EMPLOYEES = "SET_EMPLOYEES";
const SET_CURRENTEMPLOYEE = "SET_CURRENTEMPLOYEE";

// sets employee list for manager use
export const setEmployees = restaurant => {
  // console.log('setEmployees', restaurant)
  const employees = axios
    .get(`/api/employee/${restaurant}`)
    .then(res =>{
      // console.log(res) 
     return res.data
    }
    );
  return {
    type: SET_EMPLOYEES,
    payload: employees
  };
};

// pulls restaurant menu from server
export const setMenu = restaurant => {
  const menu = axios.get(`/api/menu/${restaurant}`).then(res => res.data);
  return {
    type: SET_MENU,
    payload: menu
  };
};

// pulls a specific employee by restaurant and pin
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

// manipulates redux state of employee list, menu and current user
// info
export default function reducer(state = initialState, action) {
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
