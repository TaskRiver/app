import {
  AppBar,
  Box,
  Button,
  IconButton,
  makeStyles,
  Menu,
  SvgIcon,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { Route, Switch } from 'react-router';
import WindowContent from './WindowContent';
import Home from '../pages/home/Home';
import CurrentFlows from '../pages/CurrentFlows/CurrentFlows';
import Sidebar from './Sidebar';
import Login from '../pages/Login/Login';
import TRLogo from '../assets/Logo.svg';
import routes from '../constants/routes.json';
import TaskView from '../pages/TaskView/TaskView';
import SidebarPage from '../containers/SidebarPage';
import app from '../../utils/base';

const styles = makeStyles((theme) => ({
  layoutArea: {
    display: 'flex',
    flexDirection: 'column',
    // gridTemplateColumns: '250px 1fr',
  },
  taskSidebar: {
    background: '#FFE1A8',
    width: 250,
    flex: 0,
    gridArea: 'sidebar',
    padding: 15,
    '& > *': {
      marginBottom: 10,
    },
  },
  titleArea: {
    display: 'flex',
    flexDirection: 'row',
    // padding: 5,
    alignItems: 'center',
  },
  contentArea: {
    gridArea: 'content',
    height: 'calc(100vh - 64px - 36px)',
  },
  expand: {
    flexGrow: 1,
  },
}));

export default function Layout(): JSX.Element {
  const classes = styles();
  return (
    <WindowContent>
      <div className={classes.layoutArea}>
        <AppBar
          style={{ gridArea: 'header', background: '#28aae2', height: 64 }}
          position="static"
        >
          <Toolbar style={{ paddingLeft: 15 }}>
            <img src={TRLogo} style={{ height: '75%', width: 'auto' }} />
            <div className={classes.expand}></div>
            <Button color="inherit" onClick={() => app.auth().signOut()}>
              Sign Out
            </Button>
          </Toolbar>
        </AppBar>
        <div className={classes.contentArea}>
          <Switch>
            <Route path={routes.HOME} component={SidebarPage} />
            <Route exact path={routes.TASK} component={TaskView} />
          </Switch>
        </div>
      </div>
    </WindowContent>
  );
}
