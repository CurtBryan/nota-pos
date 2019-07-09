const initalState = {
    employee: null
}

const SET_EMPLOYEE = "SET_EMPLOYEE";

export default function reducer(state = initalState, action){
    switch(action.type){
        case SET_EMPLOYEE:
            return {...state, user: action.payload};
        default:
            return state;
    }
}

export function setEmployee(employee){
    return {
        type: SET_EMPLOYEE,
        payload: employee
    }
}