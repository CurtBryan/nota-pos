import axios from "axios";

const initialState = {
  allTickets: [],
  barTickets: [],
  kitchenTickets: []
};

const SET_ALLTICKETS = "SET_ALLTICKETS";
const SET_BARTICKETS = "SET_BARTICKETS";
const SET_KITCHENTICKETS = "SET_KITCHENTICKETS";

// pulls list of all saved tickets by restaurant (map in reverse
// to see recent tickets first)
export const setAllTickets = restaurant => {
  const tickets = axios.get("/api/tickets", restaurant).then(res => res.data);
  return {
    type: SET_ALLTICKETS,
    payload: tickets
  };
};

// pulls list of open bar tickets
export const setBarTickets = restaurant => {
  const barTicks = axios.get(`/api/bar/${restaurant}`).then(res => res.data);
  return {
    type: SET_BARTICKETS,
    payload: barTicks
  };
};

export const setKitchenTickets = restaurant => {
  const kitchenTicks = axios
    .get(`/api/kitchen/${restaurant}`)
    .then(res => res.data);
  return {
    type: SET_KITCHENTICKETS,
    payload: kitchenTicks
  };
};
