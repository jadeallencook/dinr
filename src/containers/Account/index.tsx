import React, { useState } from 'react';
import './style.scss';
import LoginForm from './login-form';
import CreateAccountForm from './create-account-form';
import SettingsComponent from './settings';
import { useSelector } from 'react-redux';

const AccountComponent: React.FC = () => {
  const user = useSelector(state => state['user']);
  const [create, setCreate] = useState(false);

  return (
    <div className="AccountComponent container">
      {!user ? (
        !create ? (
          <div>
            <LoginForm />
            <br />
            <button
              onClick={() => setCreate(true)}
              className="brand primary-bg"
            >
              Create Account
            </button>
          </div>
        ) : (
          <div>
            <CreateAccountForm />
            <button
              onClick={() => setCreate(false)}
              className="brand brand-bg"
            >
              Go Back
            </button>
          </div>
        )
      ) : (
        <SettingsComponent />
      )}
    </div>
  );
};

export default AccountComponent;
