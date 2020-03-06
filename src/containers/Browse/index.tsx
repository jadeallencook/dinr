import React from 'react';
import './style.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ResultsComponent from './Results';
import 'firebase/database';
import RSVPComponent from './RSVP';

const BrowseComponent: React.FC = () => {
  const profile = useSelector(state => state['profile']);
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
      <RSVPComponent></RSVPComponent>
      <ResultsComponent></ResultsComponent>
    </div>
  );
};

export default BrowseComponent;
