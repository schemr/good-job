import { SET_SENTENCES } from './actionTypes';

import { uiStartLoading, uiStopLoading } from './index';

export const addSentence = (sentence, userId, token) => {
    return dispatch => {
        dispatch(uiStartLoading());
        console.log(sentence)
        fetch('https://good-job-ff4ca.firebaseio.com/sentences/'+userId+'/'+sentence.displayDate+'.json?auth='+token, {
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
        const queryParams = '?auth=' + token;
        fetch("https://good-job-ff4ca.firebaseio.com/sentences/"+userId+".json"+queryParams)
            .then(res => res.json())
            .then(data => {
                const fetchedData = [];
                for ( let key in data ) {
                    const fetchedSentence = [];
                    for( let k in data[key]){
                        fetchedSentence.push( {
                            ...data[key][k],
                            id: k
                        } );
                    }
                    fetchedData.push({
                        sentence: fetchedSentence,
                        date: key
                    })
                }
                console.log(fetchedData)
                dispatch(setSentence(fetchedData));
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