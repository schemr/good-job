import { AUTH_SET_USER, AUTH_LOGOUT } from '../actions/actionTypes';

const initialState = {
    user: null,
    isAuthenticated: false
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case AUTH_SET_USER: 
            return {
                ...state,
                user: action.user,
                isAuthenticated: true
            };
        case AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null,
                expiryDate: null
            };
        default: 
            return state;
    }
}

export default reducer;