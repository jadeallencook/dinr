import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import loginHandler from '../../handlers/login';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        loginHandler(email, password).catch((message: string) =>
          dispatch({
            type: 'ADD_NOTIFICATION',
            payload: {
              type: 'secondary',
              text: message
            }
          })
        );
      }}
    >
      <h2>Securely Login</h2>
      <label>Email</label>
      <input
        type="text"
        className="brand brand-bg"
        id="email"
        value={email}
        onChange={event => setEmail(event.target.value)}
      />
      <br />
      <br />
      <label>Password</label>
      <input
        type="password"
        className="brand brand-bg"
        id="password"
        value={password}
        onChange={event => setPassword(event.target.value)}
      />
      <br />
      <br />
      <span>Forgot password?</span>
      <br />
      <br />
      <input type="submit" className="brand brand-bg" value="Sign In" />
    </form>
  );
};

export default LoginForm;
