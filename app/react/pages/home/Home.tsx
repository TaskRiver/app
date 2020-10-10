import BrowserView from 'react-electron-browser-view';
import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import routes from '../../constants/routes.json';

export default function Home(): JSX.Element {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
      <div style={{ width: 350, flexShrink: 0 }} data-tid="container">
        <Typography variant="h2">Home</Typography>
        <Link to={routes.COUNTER}>to Counter</Link>
      </div>

      <BrowserView
        src="https://notion.so"
        style={{
          height: '100%',
          width: '100%',
        }}
      />
    </div>
  );
}
