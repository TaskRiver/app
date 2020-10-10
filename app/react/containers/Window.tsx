/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from '../constants/routes.json';
import App from './App';
import Home from '../pages/home/Home';

// Lazily load routes and code split with webpack
const LazyCounterPage = React.lazy(() =>
  import(/* webpackChunkName: "CounterPage" */ '../pages/counter/Counter')
);

const CounterPage = (props: Record<string, any>) => (
  <React.Suspense fallback={<h1>Loading...</h1>}>
    <LazyCounterPage {...props} />
  </React.Suspense>
);

export default function Routes() {
  return (
    <App>
      <div
        style={{
          background: '#333333',
          padding: '8px 10px',
          '-webkit-app-region': 'drag',
          WebkitUserSelect: 'none',
        }}
      >
        Custom Title Bar
      </div>
      <Switch>
        <Route path={routes.COUNTER} component={CounterPage} />
        <Route path={routes.HOME} component={Home} />
      </Switch>
    </App>
  );
}
