import { AUTH_SET_USER, AUTH_LOGOUT } from '../actions/actionTypes';

const initialState = {
    user: null
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case AUTH_SET_USER: 
            return {
                ...state,
                user: action.user
            };
        case AUTH_LOGOUT:
            return {
                ...state,
                user: null
            };
        default: 
            return state;
    }
}

export default reducer;