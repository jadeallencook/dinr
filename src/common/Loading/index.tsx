import React from 'react';
import './style.scss';
import Logo from '../../assets/dinr-logo.svg';

const Loading: React.FC = () => {
  return (
    <div className="Loading">
      <img className="animated infinite flip" src={Logo} />
    </div>
  );
}

export default Loading;
