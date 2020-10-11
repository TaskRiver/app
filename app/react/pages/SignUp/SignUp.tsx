import { Button, Paper, TextField } from '@material-ui/core';
import React, { useCallback, useState, useGlobal } from 'reactn';
import { withRouter } from 'react-router';
import app from '../../../utils/base';
import WindowContent from '../../components/WindowContent';
import TRLogo from '../../assets/Logo.svg';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json';
import API from '../../constants/API';

const SignUp = ({ history }) => {
  const [body, setBody] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const [, setUser] = useGlobal('userInfo');

  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, firstName, lastName, password } = body;
      try {
        await app.auth().createUserWithEmailAndPassword(email, password);
        const token = await app.auth().currentUser?.getIdToken();
        const user = await fetch(`${API}/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
          body: JSON.stringify({ email, firstName, lastName }),
        });
        setUser(user);
        history.push('/');
      } catch (error) {
        console.log(error);
      }
    },
    [body]
  );

  return (
    <WindowContent
      style={{
        background: '#FFE1A8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <form onSubmit={handleSignUp}>
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
            label="Email"
          />
          <TextField
            onChange={({ target }) => {
              setBody((b) => ({ ...b, password: target.value }));
            }}
            label="Password"
            type="password"
          />
          <TextField
            onChange={({ target }) => {
              setBody((b) => ({ ...b, firstName: target.value }));
            }}
            label="First Name"
          />
          <TextField
            onChange={({ target }) => {
              setBody((b) => ({ ...b, lastName: target.value }));
            }}
            label="Last Name"
          />
          <Button type="submit" variant="outlined" style={{ marginBottom: 10 }}>
            Sign Up
          </Button>
          <Button
            variant="outlined"
            component={Link}
            to={routes.LOGIN}
            style={{ marginBottom: 10 }}
          >
            Login
          </Button>
        </Paper>
      </form>
    </WindowContent>
  );
};

export default withRouter(SignUp);
