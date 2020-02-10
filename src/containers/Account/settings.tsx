import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

const SettingsComponent: React.FC = () => {
  return (
    <div className="SettingsComponent">
      <h2>Settings</h2>
      <button
        className="brand brand-bg"
        onClick={() => {
          firebase
            .auth()
            .signOut()
            .then(() => {})
            .catch(error => {});
        }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default SettingsComponent;
