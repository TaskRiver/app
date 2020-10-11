import { makeStyles } from '@material-ui/core';
import React from 'react';
import { Route, Switch } from 'react-router';
import Sidebar from '../components/Sidebar';
import CurrentFlows from '../pages/CurrentFlows/CurrentFlows';
import routes from '../constants/routes.json';
import CreateFlows from '../components/CreateFlows';

const styles = makeStyles((theme) => ({
  pageArea: {
    height: '100%',
    display: 'flex',
    // gridTemplateRows: `64px auto`,
  },
  titleArea: {
    display: 'flex',
    flexDirection: 'row',
    // padding: 5,
    alignItems: 'center',
  },
  contentArea: {
    height: '100%',
    width: 'calc(100% - 200px)',
  },
}));

export default function SidebarPage(): JSX.Element {
  const classes = styles();
  return (
    <div className={classes.pageArea}>
      <Sidebar />
      <div className={classes.contentArea}>
        <Switch>
          <Route exact path={routes.HOME} component={CurrentFlows} />
          <Route path={routes.CREATE} component={CreateFlows} />
          <Route path={routes.CREATE} component={CreateFlows} />
        </Switch>
      </div>
    </div>
  );
}
