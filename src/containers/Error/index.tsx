import React from 'react';
import './style.scss';

const ErrorComponent: React.FC = () => {
  return (
    <div className="ErrorComponent container">
      <h1>Error 404</h1>
      <p>Dinner not found!</p>
    </div>
  );
}

export default ErrorComponent;
