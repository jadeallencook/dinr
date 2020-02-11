import React from 'react';
import './style.scss';
import { useSelector } from 'react-redux';
import zipcodeToLocation from '../../helpers/zipcode-to-location';
import locationToUrl from '../../helpers/location-to-url';

const BrowseComponent: React.FC = () => {
  const zipcode = useSelector(state => state['zipcode']);
  const location = zipcode ? zipcodeToLocation(zipcode) : null;
  const url = location ? locationToUrl(location.replace(':', ',')) : null;
  
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
