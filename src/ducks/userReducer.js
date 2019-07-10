const initalState = {
    user: null
}

const SET_USER = "SET_USER";

export default function reducer(state = initalState, action){
    switch(action.type){
        case SET_USER:
            return {...state, user: action.payload};
        default:
            return state;
    }
}

export function setUser(user){
    return {
        type: SET_USER,
        payload: user
    }
}