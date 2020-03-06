import React from 'react';
import './style.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import 'firebase/database';

const BrowseComponent: React.FC = () => {
  const zipcode = useSelector(state => state['zipcode']);
  const profile = useSelector(state => state['profile']);
  const results = useSelector(state => state['results']);
  return (
    <div className="BrowseComponent container">
      <Link
        to={
          profile &&
          profile.personal &&
          profile.personal.zipcode &&
          profile.personal.street &&
          profile.personal.name
            ? '/create'
            : '/account'
        }
        className="banner"
      >
        <p>HOST YOUR OWN</p>
        <h1>DINR</h1>
      </Link>
      {zipcode && Object.keys(results).length ? (
        <div>
          <h2>Results for {zipcode}</h2>
          <p>There are currently no listings...</p>
        </div>
      ) : (
        <div>
          <h2>No dinners this week!</h2>
          <p>Support Dinr by hosting a dinner in your area.</p>
        </div>
      )}
    </div>
  );
};

export default BrowseComponent;
