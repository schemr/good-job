import { combineReducers } from 'redux';
import authReducer from './auth';
import sentenceReducer from './sentence';
import uiReducer from './ui';

const rootReducer = combineReducers({
    auth: authReducer,
    sentence: sentenceReducer,
    ui: uiReducer
});

export default rootReducer;
