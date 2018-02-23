import { SET_SENTENCES, ADD_INIT, ADD_SENTENCE_SUCCESS } from '../actions/actionTypes';

const initialState = {
    sentences: [],
    addedSentence: false
};

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case SET_SENTENCES:
            return {
                ...state,
                sentences: action.sentences
            };
        case ADD_INIT:
            return {
                ...state,
                addedSentence: false
            };
        case ADD_SENTENCE_SUCCESS:
            return {
                ...state,
                addedSentence: true
            };
        default:
            return state;
    }
};

export default reducer;