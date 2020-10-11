import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import {
  ThemeProvider,
  createMuiTheme,
  CssBaseline,
  Box,
} from '@material-ui/core';
import { history, configuredStore } from './store';

const store = configuredStore();

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

const theme = createMuiTheme({
  palette: {},
});

document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line global-require
  const Root = require('./react/containers/Root').default;
  render(
    <AppContainer>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          display="flex"
          flexDirection="column"
          height="100vh"
          maxHeight="100vh"
          // overflow="hidden"
        >
          <Root store={store} history={history} />
        </Box>
      </ThemeProvider>
    </AppContainer>,
    document.getElementById('root')
  );
});
