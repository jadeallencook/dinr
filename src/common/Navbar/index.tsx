import React from 'react';
import './style.scss';
import Logo from '../../assets/dinr-logo.svg';
import DefaultProfile from '../../assets/default-profile.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NavbarComponent: React.FC = () => {
  const zipcode = useSelector(state => state['zipcode']);
  return (
    <div className="NavbarComponent">
      <div>
        <div>
          <Link to="/">
            <img src={Logo} alt="dinr logo" />
          </Link>
        </div>
        <div>
          <input
            className="brand brand-bg"
            type="number"
            placeholder="Enter Zipcode"
            defaultValue={zipcode}
          />
        </div>
        <div>
          <Link to="/account">
            <img src={DefaultProfile} alt="dinr logo" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavbarComponent;
