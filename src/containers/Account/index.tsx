import React from 'react';
import './style.scss';
import LoginComponent from './login';
import SettingsComponent from './settings';
import { useSelector } from 'react-redux';

const AccountComponent: React.FC = () => {
  const user = useSelector(state => state['user']);

  return (
    <div className="AccountComponent container">
      {!user ? <LoginComponent /> : <SettingsComponent />}
    </div>
  );
};

export default AccountComponent;
