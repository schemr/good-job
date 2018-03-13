import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import amber from 'material-ui/colors/amber';
import orange from 'material-ui/colors/orange';

import './index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import authReducer from './store/reducers/auth';
import sentenceReducer from './store/reducers/sentence';
import uiReducer from './store/reducers/ui';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    sentence: sentenceReducer,
    ui: uiReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
const theme = createMuiTheme({
    palette: {
      primary: orange,
      secondary: amber,
    },
    status: {
      danger: 'orange',
    },
  });

const appRouter = (
    <Provider store={store}>
        <BrowserRouter>
            <MuiThemeProvider theme={theme}>
                <App />
            </MuiThemeProvider>
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(appRouter, document.getElementById('root'));
registerServiceWorker();
