import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import app from '../../../utils/base.tsx';
import { AuthContext } from '../../components/Auth.tsx';

const Login = ({ history }) => {
  const handleLogin = useCallback(async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      const response = await app
        .auth()
        .signInWithEmailAndPassword(email.value, password.value);
      const token = await app.auth().currentUser.getIdToken();
      //history.push("/");
      console.log('this is the token', token);
    } catch (error) {
      alert(error);
    }
  }, []);

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default withRouter(Login);
