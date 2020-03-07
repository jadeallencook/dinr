import React from 'react';
import './style.scss';
import 'firebase/database';
import { useDispatch, useSelector } from 'react-redux';

const DinnerComponent: React.FC = () => {
  const ref = window.location.hash.replace('#/', '');
  const dinner = useSelector(state => state['dinner']);
  const host = useSelector(state => state['host']);
  const user = useSelector(state => state['user']);
  const dispatch = useDispatch();
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
    const { datestamp, description, plates, price, title, guests } = dinner;
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
            {plates} left
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
          <div><b>There are currently no reservations.</b></div>
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
        ) : (
          <button className="brand primary-bg margin-right">
            Reserve Plate
          </button>
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
