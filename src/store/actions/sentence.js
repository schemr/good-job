import { SET_SENTENCES } from './actionTypes';

import { uiStartLoading, uiStopLoading, authGetToken } from './index';

export const addSentence = (sentence, token) => {
    return dispatch => {
        dispatch(uiStartLoading());
        console.log(sentence)
        fetch('https://good-job-ff4ca.firebaseio.com/sentences.json?auth='+token, {
                    method:"POST",
                    body: JSON.stringify(sentence),
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
    }
}

export const getSentences = (token, userId) => {
    return dispatch => {
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        fetch("https://good-job-ff4ca.firebaseio.com/sentences.json" + queryParams)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const fetchedOrders = [];
                for ( let key in data ) {
                    fetchedOrders.push( {
                        ...data[key],
                        id: key
                    } );
                }
                dispatch(setSentence(fetchedOrders));
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