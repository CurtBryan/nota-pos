import axios from "axios";

const initialState = {
  allTickets: [],
  barTickets: [],
  kitchenTickets: [],
  latestTicketNum: 0
};

const SET_ALLTICKETS = "SET_ALLTICKETS";
const SET_BARTICKETS = "SET_BARTICKETS";
const SET_KITCHENTICKETS = "SET_KITCHENTICKETS";
const SET_LATESTTICKETNUM = "SET_LATESTTICKETNUM";

// sets the latest ticket number to base all further tickets off of
export const setLatestTicketNum = restaurant => {
  const ticketnumber = axios
    .get(`/api/tickets/${restaurant}`)
    .then(res => res.data.ticketnum);
  console.log(ticketnumber);
  return {
    type: SET_LATESTTICKETNUM,
    payload: ticketnumber
  };
};

// pulls list of all saved tickets by restaurant (map in reverse
// to see recent tickets first)
export const setAllTickets = restaurant => {
  console.log("hit", restaurant);
  const tickets = axios
    .post("/api/tickets", { restaurant: restaurant })
    .then(res => res.data);
  return {
    type: SET_ALLTICKETS,
    payload: tickets
  };
};

// pulls list of open bar tickets
export const setBarTickets = tickets => {
  return {
    type: SET_BARTICKETS,
    payload: tickets.data
  };
};

// pulls list of open kitchen tickets
export const setKitchenTickets = tickets => {
  return {
    type: SET_KITCHENTICKETS,
    payload: tickets.data
  };
};

// manipulates redux state of all ticket lists
export default function reducer(state = initialState, action) {
  // console.log(action);
  switch (action.type) {
    case SET_ALLTICKETS + "_FULFILLED":
      return {
        ...state,
        allTickets: action.payload
      };
    case SET_BARTICKETS:
      return {
        ...state,
        barTickets: action.payload
      };
    case SET_KITCHENTICKETS:
      return {
        ...state,
        kitchenTickets: action.payload
      };
    case SET_LATESTTICKETNUM + "_FULFILLED":
      return {
        ...state,
        latestTicketNum: action.payload
      };
    default:
      return state;
  }
}
