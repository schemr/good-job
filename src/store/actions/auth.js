import { AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from './actionTypes';

import { uiStartLoading, uiStopLoading } from './index';

const API_KEY = 'AIzaSyDH_tgMb-5unnGs1OAgwpobaVTroqdk36o'

export const tryAuth = (authData, authMode) => {
    return dispatch => {
        dispatch(uiStartLoading());
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key='+API_KEY;
        if(authMode === 'signup') {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key='+API_KEY
        }
        fetch(url,{
            method: "POST",
            body: JSON.stringify({
                email:authData.email,
                password:authData.password,
                returnSecureToken: true
            }),
            headers:{
                "Content-Type": "application/json"
            }
        })
        .catch(err => {
            console.log("Authentication failed", err);
            dispatch(uiStopLoading());
        })
        .then(res => res.json())
        .then(data => {
            dispatch(uiStopLoading());
            if(!data.idToken) {
                alert("Authentication failed :" + data.error.message)
            }else{
                dispatch(authStoreToken(data));
            }
        });
    }
}

export const authStoreToken = (data) => {
    return dispatch => {
        const now = new Date();
        const expiryDate = now.getTime() + data.expiresIn * 1000;
        dispatch(authSetToken(data, expiryDate));
        localStorage.setItem('token', data.idToken);
        localStorage.setItem('expiryDate', expiryDate.toString());
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('userId', data.localId);
    }
};

export const authSetToken = (data, expiryDate) => {
    return {
        type: AUTH_SET_TOKEN,
        data: data,
        expiryDate: expiryDate
    };
};