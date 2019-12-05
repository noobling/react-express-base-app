import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from './authService';
import config from './auth_config.json';
import * as serviceWorker from './serviceWorker';
import history from './utils/history';

const onRedirectCallback = (appState?: any) => {
  if (appState && appState.targetUrl) {
    history.push(appState.targetUrl);
  }
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1b2b63'
    },
    secondary: {
      main: '#fe3745'
    }
  }
});

ReactDOM.render(
  <Auth0Provider
    onRedirectCallback={onRedirectCallback}
    options={{
      redirect_uri: window.location.origin,
      domain: config.domain,
      client_id: config.clientId,
      audience: config.audience
    }}
  >
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Auth0Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
