import { Button, Paper, TextField } from '@material-ui/core';
import React, { useCallback, useContext, useState } from 'react';
import { withRouter, Redirect } from 'react-router';
import app from '../../../utils/base.tsx';
import { AuthContext } from '../../components/Auth.tsx';
import WindowContent from '../../components/WindowContent';
import TRLogo from '../../assets/Logo.svg';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json';

const Login = ({ history }) => {
  const [body, setBody] = useState({
    email: '',
    password: '',
  });

  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = body;
      try {
        const response = await app
          .auth()
          .signInWithEmailAndPassword(email, password);
        const token = await app.auth().currentUser.getIdToken();
        //history.push("/");
        console.log('this is the token', token);
      } catch (error) {
        console.log(error);
      }
    },
    [body]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <WindowContent
      style={{
        background: '#FFE1A8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <form onSubmit={handleLogin}>
        <Paper
          style={{
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            width: 400,
          }}
        >
          <img src={TRLogo} style={{ height: '75%', width: 'auto' }} />

          <TextField
            onChange={({ target }) => {
              setBody((b) => ({ ...b, email: target.value }));
            }}
            name="email"
            label="Email"
          />
          <TextField
            onChange={({ target }) => {
              setBody((b) => ({ ...b, password: target.value }));
            }}
            name="password"
            label="Password"
            type="password"
          />
          <Button type="submit" variant="outlined" style={{ marginBottom: 10 }}>
            Login
          </Button>
          <Button
            variant="outlined"
            component={Link}
            to={routes.SIGNUP}
            style={{ marginBottom: 10 }}
          >
            Sign Up
          </Button>
        </Paper>
      </form>
    </WindowContent>
  );
};

export default withRouter(Login);
