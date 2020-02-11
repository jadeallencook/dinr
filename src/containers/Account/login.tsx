import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useDispatch } from 'react-redux';

const LoginComponent: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <div className="LoginComponent">
      <h2>Let's get cookin!</h2>
      <form
        onSubmit={event => {
          const form: any = event.target;
          const email: string = form.querySelector('input#email').value;
          const password: string = form.querySelector('input#password').value;
          firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(error =>
              dispatch({
                type: 'ADD_NOTIFICATION',
                payload: {
                  type: 'secondary',
                  text: error.message
                }
              })
            );
        }}
      >
        <label>Email</label>
        <input
          type="text"
          className="brand brand-bg"
          placeholder="email@domain.com"
          id="email"
        />
        <label>Password</label>
        <input
          type="password"
          className="brand brand-bg"
          placeholder="••••••••••"
          id="password"
        />
        <span>Forgot password?</span>
        <input type="submit" className="brand brand-bg" value="Sign In" />
        <button className="brand primary-bg">Create Account</button>
      </form>
    </div>
  );
};

export default LoginComponent;
