import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import logoutHandler from '../../handlers/logout';
import Form from './form';

const SettingsComponent: React.FC = () => {
  const user = useSelector(state => state['user']);
  const dispatch = useDispatch();
  return (
    <div className="SettingsComponent">
      <h2>Account Settings</h2>
      <p id="email">{user.email}</p>
      <p>
        <small>
          No information is required but we recommend adding a zipcode for
          posting and searching nearby dinners.
        </small>
      </p>
      <br />
      <Form />
      <button
        className="brand brand-bg"
        onClick={() =>
          logoutHandler().then(() => {
            dispatch({
              type: 'LOGOUT',
              payload: null
            });
          })
        }
      >
        Sign Out
      </button>
    </div>
  );
};

export default SettingsComponent;
