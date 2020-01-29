import React from 'react';
import './style.scss';

const BrowseComponent: React.FC = () => {
  return (
    <div className="BrowseComponent container">
      <div className="banner">
        <p>HOST YOUR OWN</p>
        <h1>DINR</h1>
      </div>
      <h2>Featured Dinners</h2>
      <p>There are currently no listings...</p>
    </div>
  );
}

export default BrowseComponent;
