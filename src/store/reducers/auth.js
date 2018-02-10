import { AUTH_SET_TOKEN, AUTH_LOGOUT } from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    expiryDate: null
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case AUTH_SET_TOKEN:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                expiryDate: action.expiryDate
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