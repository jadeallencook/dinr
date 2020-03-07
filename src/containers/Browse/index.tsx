import React from 'react';
import './style.scss';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ListingComponent from './listing';

const BrowseComponent: React.FC = () => {
  const zipcode = useSelector(state => state['zipcode']);
  const profile = useSelector(state => state['profile']);
  const results = useSelector(state => state['results']);
  const dispatch = useDispatch();
  dispatch({
    type: 'SET_DINNER',
    payload: null
  });
  dispatch({
    type: 'SET_HOST',
    payload: null
  });
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
      {zipcode && results.length ? (
        <div>
          <h2>Results for {zipcode}</h2>
          {results.map((result: any, index: number) => {
            const { ref, plates, guests } = result;
            const dinnerUid = ref.split('/')[2];
            const platesLeft = guests
              ? plates - Object.keys(guests).length
              : plates;
            const isReserved =
              profile &&
              profile.reservations &&
              Object.keys(profile.reservations).indexOf(dinnerUid) !== -1;
            return platesLeft && !isReserved ? (
              <ListingComponent listing={result} key={`listing-${index}`} />
            ) : null;
          })}
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
