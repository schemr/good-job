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
            console.log(data);
            // if(!data.idToken) {
            //     alert("Authentication failed :" + data.error.message)
            // }else{
            //     // dispatch(authStoreToken(data.idToken, data.expiresIn, data.refreshToken));
            //     // startMainTabs();
            // }
        });
    }
}
