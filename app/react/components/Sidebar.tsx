import {
  AppBar,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { AddCircle, Drafts, Home, Inbox, Settings } from '@material-ui/icons';
import React, { ReactElement } from 'react';
import WavesIcon from '@material-ui/icons/Waves';
import SettingsIcon from '@material-ui/icons/Settings';
import routes from '../constants/routes.json';
import { useHistory } from 'react-router';

const styles = makeStyles((theme) => ({
  taskSidebar: {
    background: '#FFE1A8',
    width: 200,
    gridArea: 'sidebar',
    padding: 15,
    '& > *': {
      marginBottom: 10,
    },
  },
}));

interface MenuItem {
  title: string;
  path: string;
  icon: ReactElement;
}

const menuItems: MenuItem[] = [
  {
    title: 'Flows',
    icon: <WavesIcon />,
    path: routes.HOME,
  },
  {
    title: 'Create',
    icon: <AddCircle />,
    path: routes.CREATE,
  },
  {
    title: 'Settings',
    icon: <SettingsIcon />,
    path: routes.SETTINGS,
  },
];

export default function Sidebar(): JSX.Element {
  const history = useHistory();
  const classes = styles();
  return (
    <div className={classes.taskSidebar}>
      <List component="nav">
        {menuItems.map((item) => (
          <ListItem
            key={item.title}
            button
            style={{
              borderRadius: 100,
              marginBottom: 10,
            }}
            selected={item.path === history.location.pathname}
            onClick={() => {
              history.push(item.path);
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
