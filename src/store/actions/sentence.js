import { SET_SENTENCES } from './actionTypes';

import { uiStartLoading, uiStopLoading, authGetToken } from './index';

export const addSentence = (sentence) => {
    return dispatch => {
        let authToken;
        dispatch(uiStartLoading());
        dispatch(authGetToken())
            .catch(()=>console.log('No valid token'))
            .then(token => {
                authToken = token;
                return fetch('https://good-job-ff4ca.firebaseio.com/sentences.json?auth='+authToken, {
                    method:"POST",
                    body: sentence,
                    headers: {
                        "Content-Type" : "application/json"
                    }
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    dispatch(uiStopLoading());
                })
                .catch(err => {
                    console.log(err);
                    dispatch(uiStopLoading());
                })
            })
    }
}

export const getSentences = () => {
    return dispatch => {
        dispatch(authGetToken())
            .then(token => {
                return fetch("https://good-job-ff4ca.firebaseio.com/sentences.json?auth="+token)
            })
            .catch(() => {
                console.log("No Valid Token")
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                dispatch(setSentence(data));
            })
            .catch(err => {
                console.log(err);
            });
    }
};

export const setSentence = sentences => {
    return {
        type: SET_SENTENCES,
        sentences: sentences
    };
};