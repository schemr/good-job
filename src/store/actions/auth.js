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

export const authGetToken = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {
            const token = getState().auth.data.idToken;
            const expiryDate = getState().auth.expiryDate;
            if(!token || new Date(expiryDate) <= new Date()) {
                let fetchedToken;
                localStorage.getItem('token')
                    .catch(err => reject())
                    .then(tokenFromStorage => {
                        fetchedToken = tokenFromStorage;
                        if(!tokenFromStorage){
                            reject();
                        }
                        return localStorage.getItem('expiryDate')
                    })
                    .then(expiryDate => {
                        const parsedExpiryDate = new Date(parseInt(expiryDate));
                        const now = new Date();
                        if(parsedExpiryDate > now) {
                            //dispatch(authSetToken(fetchedToken))
                            console.log(fetchedToken)
                            resolve(fetchedToken);
                        }else{
                            reject();
                        }
                    })
                    .catch(err => reject());
            }else{
                resolve(token);
            }
        });
        return promise.catch(err => {
            return localStorage.getItem('refreshToken')
                .then(refreshToken => {
                    return fetch("https://securetoken.googleapis.com/v1/token?key="+API_KEY, {
                        method: "POST",
                        headers: {
                            "Content-Type" : "application/x-www-from-urlencoded"
                        },
                        body: "grant_type=refresh_token&refresh_token="+refreshToken
                    });
                })
                .then(res => res.json())
                .then(data => {
                    if(data.id_token) {
                        console.log("Refresh Token Success")
                        dispatch(authStoreToken(data));
                        return data.id_token;
                    }else{
                        dispatch(authClearStorage())
                    }
                })
        })
        .then(token => {
            if(!token) {
                throw(new Error());
            }else{
                return token;
            }
        })
    }
}

export const authClearStorage = () => {
    return dispatch => {
        localStorage.removeItem('token');
        localStorage.removeItem('expiryDate');
        return localStorage.removeItem('refreshToken');
    }
};