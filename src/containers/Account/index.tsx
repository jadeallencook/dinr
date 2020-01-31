import React from 'react';
import './style.scss';
import LoginComponent from '../../common/Login';
import { useSelector } from 'react-redux';

const AccountComponent: React.FC = () => {
  const user = useSelector(state => state['user']);

  return (
    <div className="AccountComponent container">
      { !user ? <LoginComponent /> : null }
    </div>
  );
};

export default AccountComponent;
