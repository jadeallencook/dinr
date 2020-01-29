import React from 'react';
import './style.scss';

const FooterComponent: React.FC = () => {
  return (
    <div className="FooterComponent">
      <p>
        Eat Dinr | <b>Neighborhood Meal Sharing</b>
      </p>
      <p>Developed in Saginaw, Michigan</p>
      <p>Copyright 2015-{new Date().getFullYear()}</p>
    </div>
  );
};

export default FooterComponent;
