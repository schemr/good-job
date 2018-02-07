import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import './index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import authReducer from './store/reducers/auth';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    auth: authReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const appRouter = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(appRouter, document.getElementById('root'));
registerServiceWorker();
