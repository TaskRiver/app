/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from '../constants/routes.json';
import App from './App';
import TaskView from '../pages/TaskView/TaskView';
import Login from '../pages/Login/Login';
import SignUp from '../pages/SignUp/SignUp';
import PrivateRoute from '../components/PrivateRoute';
import Layout from '../components/Layout';
import { makeStyles } from '@material-ui/core';

// Lazily load routes and code split with webpack

const Test = () => <>Test</>;

const styles = makeStyles({
  titleBar: {
    background: '#333333',
    padding: '8px 10px',
    '-webkit-app-region': 'drag',
    WebkitUserSelect: 'none',
    flex: 0,
    color: 'white',
    '& + *': {
      flex: 1,
    },
  },
});

export default function Window() {
  const classes = styles();
  return (
    <App>
      <div className={classes.titleBar}>🌊TaskRiver</div>
      <Switch>
        {/* <Route path={routes.COUNTER} component={Test} /> */}
        {/* <PrivateRoute exact path={routes.HOME} component={Home} /> */}
        <Route path={routes.LOGIN} component={Login} />
        <Route path={routes.SIGNUP} component={SignUp} />
        <PrivateRoute component={Layout} />
        {/* <Route path={routes.TASK} component={TaskView} /> */}
      </Switch>
    </App>
  );
}
