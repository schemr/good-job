import { SET_SENTENCES, ADD_SENTENCE_SUCCESS, ADD_SENTENCE_FAIL, ADD_INIT } from './actionTypes';
import { uiStartLoading, uiStopLoading, authCheckState } from './index';

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
                    dispatch(addSentenceSuccess());
                })
                .catch(err => {
                    console.log(err);
                    dispatch(uiStopLoading());
                })
    }
}

export const getSentences = (token, userId) => {
    return dispatch => {
        dispatch(uiStartLoading());
        const queryParams = '?auth=' + token +'&orderBy="$key"&limitToLast=10';
        fetch("https://good-job-ff4ca.firebaseio.com/sentences/"+userId+".json"+queryParams)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                dispatch(uiStopLoading());
                if(data){
                    if(data.error){
                        dispatch(authCheckState())
                    }else{
                        const fetchedData = [];
                        for ( let key in data ) {
                            const fetchedSentence = [];
                            for( let k in data[key]){
                                fetchedSentence.push( {
                                    ...data[key][k],
                                    id: k
                                });
                            }
                            fetchedData.push({
                                sentence: fetchedSentence,
                                date: key
                            })
                        }
                        console.log(fetchedData)
                        dispatch(setSentence(fetchedData.reverse()));
                    }
                }else{
                    dispatch(setSentence([]));
                }
            })
            .catch(err => {
                console.log(err);
                dispatch(uiStopLoading());
            });
    }
};

export const setSentence = sentences => {
    return {
        type: SET_SENTENCES,
        sentences: sentences
    };
};

export const addSentenceSuccess = () => {
    return {
        type: ADD_SENTENCE_SUCCESS
    };
};

export const addSentenceFail = () => {
    return {
        type: ADD_SENTENCE_FAIL
    };
};

export const addInit = () => {
    return {
        type: ADD_INIT
    };
};