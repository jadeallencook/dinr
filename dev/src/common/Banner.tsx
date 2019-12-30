import React from 'react';
import './Banner.scss';
import { Link } from 'react-router-dom';

const Banner: React.FC = () => {
  return (
    <Link to="/create" className="Banner">
      <h1>
        <span>HOST YOUR OWN</span><br />DINR</h1>
    </Link>
  );
}

export default Banner;
