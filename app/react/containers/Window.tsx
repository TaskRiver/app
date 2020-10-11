/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from '../constants/routes.json';
import App from './App';
import TaskView from '../pages/TaskView/TaskView';
import { AuthProvider } from '../components/Auth';
import Login from '../pages/Login/Login';
import SignUp from '../pages/SignUp/SignUp';
import Home from '../pages/home/Home';
import PrivateRoute from '../components/PrivateRoute';

// Lazily load routes and code split with webpack

const Test = () => <>Test</>;

export default function Window() {
  return (
    <App>
      <div
        style={{
          background: '#333333',
          padding: '8px 10px',
          '-webkit-app-region': 'drag',
          WebkitUserSelect: 'none',
          flex: 0,
          color: 'white',
        }}
      >
        Custom Title Bar
      </div>
      <div style={{ flex: 1 }}>
        <Switch>
          {/* <Route path={routes.COUNTER} component={Test} /> */}
          <PrivateRoute exact path={routes.HOME} component={Home} />
          <Route path={routes.LOGIN} component={Login} />
          <Route path={routes.SIGNUP} component={SignUp} />
          {/* <Route path={routes.TASK} component={TaskView} /> */}
        </Switch>
      </div>
    </App>
  );
}
