import React from 'react';
import './style.scss';
import 'firebase/database';
import { useDispatch, useSelector } from 'react-redux';

const DinnerComponent: React.FC = () => {
  const ref = window.location.hash.replace('#/', '');
  const dinner = useSelector(state => state['dinner']);
  const dispatch = useDispatch();
  if (!dinner || dinner.ref !== ref) {
    dispatch({
      type: 'GET_DINNER',
      payload: ref
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
    dinner.ref === ref
  ) {
    const { datestamp, description, plates, price, profile, title } = dinner;
    const date = new Date(datestamp);
    return (
      <div className="DinnerComponent container">
        <h2>
          ${price} {title}
        </h2>
        <p>{description}</p>
        <ul>
          <li>
            <b>Host: </b>Jade Allen Cook
          </li>
          <li>
            <b>Address: </b>123 Fake Street
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
        <button
          className="brand brand-bg margin-right"
          onClick={() => window.location.hash = ''}
        >
          Browse All
        </button>
        <button className="brand primary-bg margin-right">Reserve Plate</button>
        <br /><br />
      </div>
    );
  } else if (dinner && dinner.ref === ref) {
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
