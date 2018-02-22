import { SET_SENTENCES } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';

export const addSentence = (sentence, userId, token) => {
    return dispatch => {
        dispatch(uiStartLoading());
        console.log(sentence)
        // Todo Data structure change 
        fetch('https://good-job-ff4ca.firebaseio.com/sentences/'+userId+'/.json?auth='+token, {
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
        const queryParams = '?auth=' + token +'&orderBy="displayDate"&limitToLast=2';
        // Todo Data structure change 
        fetch("https://good-job-ff4ca.firebaseio.com/sentences/"+userId+".json"+queryParams)
            .then(res => res.json())
            .then(data => {
                const fetchedData = [];
                for ( let key in data ) {
                    fetchedData.push({
                        ...data[key],
                        id: key
                    })
                }
                console.log(fetchedData)
                dispatch(setSentence(fetchedData.reverse()));
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