import { SET_SENTENCES } from '../actions/actionTypes';

const initialState = {
    sentences: []
};

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case SET_SENTENCES:
            return {
                ...state,
                sentences: action.sentences
            };
        default:
            return state;
    }
};

export default reducer;