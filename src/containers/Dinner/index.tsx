import React from 'react';
import './style.scss';
import 'firebase/database';
import { useDispatch } from 'react-redux';

const DinnerComponent: React.FC = () => {
  const ref = window.location.hash.replace('#/', '');
  const dispatch = useDispatch();
  dispatch({
    type: 'GET_DINNER',
    payload: ref
  });
  return (
    <div className="DinnerComponent container">
      <h1>dinner</h1>
    </div>
  );
}

export default DinnerComponent;
