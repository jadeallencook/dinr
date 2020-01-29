import React from 'react';
import './style.scss';
import Logo from '../../assets/dinr-logo.svg';
import DefaultProfile from '../../assets/default-profile.png';

const NavbarComponent: React.FC = () => {
  return (
    <div className="NavbarComponent">
      <div>
        <div>
          <img src={Logo} alt="dinr logo" />
        </div>
        <div>
          <input type="number" placeholder="Enter Zipcode" />
        </div>
        <div>
          <img src={DefaultProfile} alt="dinr logo" />
        </div>
      </div>
    </div>
  );
};

export default NavbarComponent;
