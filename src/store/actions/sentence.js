import { SET_SENTENCES } from './actionTypes';

export const setSentence = sentences => {
    return {
        type: SET_SENTENCES,
        sentences: sentences
    };
};