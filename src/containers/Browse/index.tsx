import React from 'react';
import './style.scss';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ListingComponent from './listing';

const BrowseComponent: React.FC = () => {
  const zipcode = useSelector(state => state['zipcode']);
  const profile = useSelector(state => state['profile']);
  const user = useSelector(state => state['user']);
  const dispatch = useDispatch();
  const listings = useSelector(state => state['results']).filter(
    (listing: any) => {
      const { ref, plates, guests } = listing;
      const dinnerUid = ref.split('/')[2];
      const platesLeft = guests ? plates - Object.keys(guests).length : plates;
      const isReserved =
        profile &&
        profile.reservations &&
        Object.keys(profile.reservations).indexOf(dinnerUid) !== -1;
      const isOwner = listing.profile && user && user.uid;
      return platesLeft && !isReserved && !isOwner ? listing : null;
    }
  );
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
      {zipcode && listings.length ? (
        <div>
          <h2>Dinners in {zipcode}</h2>
          {listings.map((listing: any, index: number) => (
            <ListingComponent listing={listing} key={`listing-${index}`} />
          ))}
        </div>
      ) : (
        <div>
          <h2>No dinners found!</h2>
          <p>Support Dinr by hosting a dinner in your area.</p>
        </div>
      )}
    </div>
  );
};

export default BrowseComponent;
