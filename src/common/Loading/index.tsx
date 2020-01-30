import React from 'react';
import './style.scss';
import Logo from '../../assets/dinr-logo.svg';

const LoadingComponent: React.FC = () => {
  return (
    <div className="LoadingComponent">
      <img className="animated infinite flip" src={Logo} alt="Eat Dinr Logo" />
    </div>
  );
}

export default LoadingComponent;
