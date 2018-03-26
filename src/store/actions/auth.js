import { AUTH_SET_USER, AUTH_LOGOUT } from './actionTypes';

export const authSetUser = (user) => {
    return {
        type: AUTH_SET_USER,
        user: user
    };
};


export const logout = () => {
    return {
        type: AUTH_LOGOUT
    }
};