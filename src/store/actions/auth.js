import { AUTH_SET_TOKEN, AUTH_LOGOUT } from './actionTypes';

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
        .then(res => res.json())
        .then(data => {
            dispatch(uiStopLoading());
            if(!data.idToken) {
                alert("Authentication failed :" + data.error.message)
            }else{
                dispatch(authStoreToken(data.idToken, data.refreshToken, data.localId, data.expiresIn));
                dispatch(checkAuthTimeout(data.expiresIn));
            }
        })
        .catch(err => {
            console.log("Authentication failed", err);
            dispatch(uiStopLoading());
        });
    }
}

export const authStoreToken = (token, refreshToken, userId, expiresIn) => {
    return dispatch => {
        const now = new Date();
        const expiryDate = now.getTime() + expiresIn * 1000;
        dispatch(authSetToken(token, expiryDate, userId));
        localStorage.setItem('token', token);
        localStorage.setItem('expiryDate', expiryDate.toString());
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('userId', userId);
    }
};

export const authSetToken = (token, expiryDate, userId) => {
    return {
        type: AUTH_SET_TOKEN,
        token: token,
        expiryDate: expiryDate,
        userId: userId
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        console.log('Timeout', expirationTime)
        setTimeout(() => {
            dispatch(updateAuth());
        }, expirationTime * 1000);
    };
};

export const authCheckState = () => {
    return dispatch => {
        const fetchedToken = localStorage.getItem('token');
        const fetchedUserId = localStorage.getItem('userId');
        if(!fetchedToken) {
            console.log('Logout')
            dispatch(logout());
        }else {
            const fetchedExpiryDate = localStorage.getItem('expiryDate');
            const parsedExpiryDate = new Date(parseInt(fetchedExpiryDate, 10));
            const now = new Date();
            if(parsedExpiryDate < now) {
                dispatch(updateAuth());
            }else{
                const expirationTime = (fetchedExpiryDate - now.getTime()) / 1000
                dispatch(checkAuthTimeout(Math.floor(expirationTime)));
                dispatch(authSetToken(fetchedToken, fetchedExpiryDate, fetchedUserId))
            }
        }
    }
};

export const updateAuth = () => {
    return dispatch => {
        const fetchedRefreshToken = localStorage.getItem('refreshToken')
        fetch("https://securetoken.googleapis.com/v1/token?key="+API_KEY, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "grant_type=refresh_token&refresh_token="+fetchedRefreshToken
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.id_token) {
                    console.log("Refresh Token Success")
                    dispatch(authStoreToken(data.id_token, data.refresh_token, data.user_id, data.expires_in));
                    dispatch(checkAuthTimeout(data.expires_in));
                }else{
                    dispatch(logout())
                }
            })
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    return {
        type: AUTH_LOGOUT
    }
};