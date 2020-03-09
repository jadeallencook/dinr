import React from 'react';
import './style.scss';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ListingComponent from './listing';
import filterReservations from '../../helpers/filter-reservations';
import filterHosting from '../../helpers/filter-hosting';

const BrowseComponent: React.FC = () => {
  const zipcode = useSelector(state => state['zipcode']);
  const profile = useSelector(state => state['profile']);
  const user = useSelector(state => state['user']);
  const hosting = useSelector(state => state['hosting']);
  const reservations = useSelector(state => state['reservations']);
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
      const isOwner =
        listing.profile && user && user.uid && listing.profile === user.uid;
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
  if (
    profile &&
    profile.reservations &&
    reservations &&
    filterReservations(profile.reservations).length !== reservations.length
  ) {
    dispatch({
      type: 'GET_RESERVATIONS',
      payload: filterReservations(profile.reservations)
    });
  }
  if (
    profile &&
    profile.hosting &&
    hosting &&
    filterHosting(profile.hosting).length !== hosting.length
  ) {
    dispatch({
      type: 'GET_HOSTING',
      payload: filterHosting(profile.hosting)
    });
  }
  return (
    <div className="BrowseComponent container">
      <Link
        to={
          profile &&
          profile.personal &&
          profile.personal.zipcode 
            ? '/create'
            : '/account'
        }
        className="banner"
      >
        <p>HOST YOUR OWN</p>
        <h1>DINR</h1>
      </Link>
      {hosting && hosting.length ? (
        <div>
          <h2>Hosted By You</h2>
          {hosting.map((listing: any, index: number) => (
            <ListingComponent listing={listing} key={`hosting-${index}`} />
          ))}
        </div>
      ) : null}
      {user && profile && reservations.length && profile.reservations ? (
        <div>
          <h2>Upcoming Reservations</h2>
          {reservations.map((listing: any, index: number) => (
            <ListingComponent listing={listing} key={`reservation-${index}`} />
          ))}
        </div>
      ) : null}
      {zipcode && listings.length ? (
        <div>
          <h2>Dinners Nearby</h2>
          {listings.map((listing: any, index: number) => (
            <ListingComponent listing={listing} key={`nearby-${index}`} />
          ))}
        </div>
      ) : (
        <div>
          <h2>No Dinners Nearby</h2>
          <p>Support Dinr by hosting a dinner in your area.</p>
        </div>
      )}
    </div>
  );
};

export default BrowseComponent;
