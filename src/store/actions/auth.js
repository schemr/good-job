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
        dispatch(authSetToken(data.idToken, expiryDate, data.localId));
        localStorage.setItem('token', data.idToken);
        localStorage.setItem('expiryDate', expiryDate.toString());
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('userId', data.localId);
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

export const authCheckState = () => {
    return dispatch => {
        const fetchedToken = localStorage.getItem('token');
        const fetchedUserId = localStorage.getItem('userId');
        if(!fetchedToken) {
            console.log('Logout')
            //dispatch(logout());
        }else {
            const fetchedExpiryDate = localStorage.getItem('expiryDate');
            const parsedExpiryDate = new Date(parseInt(fetchedExpiryDate, 10));
            const now = new Date();
            if(parsedExpiryDate < now) {
                const fetchedRefreshToken = localStorage.getItem('refreshToken')
                fetch("https://securetoken.googleapis.com/v1/token?key="+API_KEY, {
                        method: "POST",
                        headers: {
                            "Content-Type" : "application/x-www-from-urlencoded"
                        },
                        body: "grant_type=refresh_token&refresh_token="+fetchedRefreshToken
                    })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if(data.id_token) {
                            console.log("Refresh Token Success")
                            dispatch(authStoreToken(data));
                        }else{
                            //dispatch(logout())
                        }
                    })
            }else{
                dispatch(authSetToken(fetchedToken, fetchedExpiryDate, fetchedUserId))
            }
        }
    }
};

export const authAutoSignIn = () => {
    return dispatch => {
        dispatch(authCheckState())
        // .then(token => {
        //     console.log(token);
        // })
        // .catch(err => console.log("Failed to fetch to token"))
    };
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