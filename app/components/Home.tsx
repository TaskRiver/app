import BrowserView from 'react-electron-browser-view';
import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.css';

export default function Home(): JSX.Element {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'row-reverse', height: '100vh' }}
    >
      <div className={styles.container} data-tid="container">
        <h2>Home</h2>
        <Link to={routes.COUNTER}>to Counter</Link>
      </div>
      <div>
        <BrowserView
          src="https://notion.so"
          style={{
            height: '100%',
            width: '100%',
          }}
        />
      </div>
    </div>
  );
}
