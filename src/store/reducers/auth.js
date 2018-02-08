import { AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from '../actions/actionTypes';

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
                token: action.data.idToken,
                userId: action.data.localId,
                expiryDate: action.expiryDate
            };
        case AUTH_REMOVE_TOKEN:
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