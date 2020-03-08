import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useDispatch } from 'react-redux';

const LoginComponent: React.FC = () => {
  const dispatch = useDispatch();

  const loginHandler = (email: string, password: string) =>
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

  const createAccountHandler = (email: string, password: string) =>
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(error =>
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            type: 'secondary',
            text: error.message
          }
        })
      );

  return (
    <div className="LoginComponent">
      <h2>Let's get cookin!</h2>
      <form
        onSubmit={event => {
          event.preventDefault();
          const form: any = event.target;
          const email: string = form.querySelector('input#email').value;
          const password: string = form.querySelector('input#password').value;
          const action: string | null = document.activeElement
            ? document.activeElement.getAttribute('data-action')
            : '';
          if (action === 'create') {
            createAccountHandler(email, password);
          } else {
            loginHandler(email, password);
          }
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
        <input
          data-action="login"
          type="submit"
          className="brand brand-bg"
          value="Sign In"
        />
        <button data-action="create" className="brand primary-bg">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default LoginComponent;
