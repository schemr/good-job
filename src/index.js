import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import amber from 'material-ui/colors/amber';
import orange from 'material-ui/colors/orange';

import './index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

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
