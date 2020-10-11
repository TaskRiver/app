import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader/root';
import { History } from 'history';
import { Store } from '../../store';
import Window from './Window';
import { AuthProvider } from '../components/Auth';

type Props = {
  store: Store;
  history: History;
};

const Root = ({ store, history }: Props) => (
  <Provider store={store}>
    <AuthProvider>
      <ConnectedRouter history={history}>
        <Window />
      </ConnectedRouter>
    </AuthProvider>
  </Provider>
);

export default hot(Root);
