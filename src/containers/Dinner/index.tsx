import React from 'react';
import './style.scss';
import * as firebase from 'firebase/app';
import 'firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const DinnerComponent: React.FC = () => {
  const ref = window.location.hash.replace('#/', '');
  const dinner = useSelector(state => state['dinner']);
  const host = useSelector(state => state['host']);
  const user = useSelector(state => state['user']);
  const profile = useSelector(state => state['profile']);
  const dispatch = useDispatch();
  const dinnerUid = dinner ? dinner.ref.split('/')[2] : '';
  const isReserved =
    dinner &&
    profile &&
    profile.reservations &&
    Object.keys(profile.reservations).indexOf(dinnerUid) !== -1;
  let platesLeft = 0;
  if (dinner && dinner.guests && dinner.guests && dinner.plates) {
    platesLeft = dinner.plates - Object.keys(dinner.guests).length;
  } else if (dinner && dinner.plates) {
    platesLeft = dinner.plates;
  }

  if (!dinner || dinner.ref !== ref) {
    dispatch({
      type: 'GET_DINNER',
      payload: ref
    });
  }

  if ((!host && dinner) || (host && host.uid !== dinner.profile)) {
    dispatch({
      type: 'GET_HOST',
      payload: dinner.profile
    });
  }

  function reserve() {
    dispatch({
      type: 'SET_LOADING',
      payload: true
    });
    Promise.all([
      new Promise((res, re) => {
        firebase
          .database()
          .ref(`${ref}/guests/${user.uid}/`)
          .set(profile.personal.name)
          .then(() => res());
      }),
      new Promise((res, re) => {
        firebase
          .database()
          .ref(`profiles/${user.uid}/reservations/${ref.split('/')[2]}`)
          .set(ref)
          .then(() => res());
      })
    ]).then(() => (window.location.hash = ''));
  }

  function unreserve() {
    dispatch({
      type: 'SET_LOADING',
      payload: true
    });
    Promise.all([
      new Promise((res, re) => {
        firebase
          .database()
          .ref(`${ref}/guests/${user.uid}/`)
          .remove()
          .then(() => res());
      }),
      new Promise((res, re) => {
        firebase
          .database()
          .ref(`profiles/${user.uid}/reservations/${ref.split('/')[2]}`)
          .remove()
          .then(() => res());
      })
    ]).then(() => (window.location.hash = ''));
  }

  if (
    dinner &&
    dinner.datestamp &&
    dinner.description &&
    dinner.plates &&
    dinner.price &&
    dinner.profile &&
    dinner.title &&
    dinner.ref === ref &&
    host &&
    host.personal &&
    host.personal.name &&
    host.personal.street
  ) {
    const { datestamp, description, price, title, guests } = dinner;
    const { name, street } = host.personal;
    const date = new Date(datestamp);
    return (
      <div className="DinnerComponent container">
        <h2>
          ${price} {title}
        </h2>
        <p>{description}</p>
        <ul>
          <li>
            <b>Host: </b>
            {name}
          </li>
          <li>
            <b>Address: </b>
            {street}
          </li>
          <li>
            <b>Date: </b>
            {date.toLocaleDateString()}
          </li>
          <li>
            <b>Time: </b>
            {date.toLocaleTimeString().replace(':00 ', ' ')}
          </li>
          <li>
            <b>Plates: </b>
            {platesLeft} left
          </li>
        </ul>
        {user && user.uid === host.uid && guests ? (
          <div>
            <p>
              <b>Your Guests:</b>
            </p>
            <ul>
              <li>John Doe</li>
            </ul>
          </div>
        ) : user && user.uid === host.uid && !guests ? (
          <div>
            <b>There are currently no reservations.</b>
          </div>
        ) : null}
        <button
          className="brand brand-bg margin-right"
          onClick={() => (window.location.hash = '')}
        >
          Browse All
        </button>
        {user && user.uid === host.uid ? (
          <span>
            <button className="brand primary-bg margin-right">Edit</button>
            <button className="brand secondary-bg margin-right margin-top">
              Delete
            </button>
          </span>
        ) : isReserved ? (
          <button
            className="brand secondary-bg margin-right"
            onClick={unreserve}
          >
            Cancel Reservation
          </button>
        ) : user ? (
          <button className="brand primary-bg margin-right" onClick={reserve}>
            Reserve Plate
          </button>
        ) : (
          <Link to="/account">
            <button className="brand primary-bg margin-right">
              Reserve Plate
            </button>
          </Link>
        )}
        <br />
        <br />
      </div>
    );
  } else if (host && dinner && dinner.ref === ref) {
    window.location.hash = '/error';
    return (
      <div className="DinnerComponent container">
        <h2>System Error</h2>
      </div>
    );
  } else {
    return (
      <div className="DinnerComponent container">
        <h2>Hold Tight</h2>
        <p>We are looking for your listing...</p>
        <br />
      </div>
    );
  }
};

export default DinnerComponent;
