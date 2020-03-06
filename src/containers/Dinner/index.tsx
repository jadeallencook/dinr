import React from 'react';
import './style.scss';
import 'firebase/database';

const DinnerComponent: React.FC = () => {
  // TODO: dispatch SET_DINNER action with ref
  const ref = window.location.hash.replace('#/', '');
  return (
    <div className="DinnerComponent container">
      <h1>dinner</h1>
    </div>
  );
}

export default DinnerComponent;
