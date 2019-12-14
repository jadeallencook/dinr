import React from 'react';
import './Navbar.scss';

function Navbar() {
  return (
    <nav className="Navbar">
      <div>
        <span>DINR</span>
      </div>
      <div>
        <input placeholder="City or Zip" />
      </div>
      <div>
        <img src="assets/default-profile.png" alt="Default profile" />
      </div>
    </nav>
  );
}

export default Navbar;