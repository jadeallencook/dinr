import React from 'react';
import './style.scss';
import firebase from 'firebase/app';
import 'firebase/database';
import { useSelector, useDispatch } from 'react-redux';
import zipcodeToLocation from '../../helpers/zipcode-to-location';
import locationToUrl from '../../helpers/location-to-url';
import dinnerTemp from '../../templates/dinner.json';

const CreateComponent: React.FC = () => {
  const profile = useSelector(state => state['profile']);
  const user = useSelector(state => state['user']);
  const dispatch = useDispatch();
  return (
    <div className="CreateComponent container">
      <h2>Host Dinner</h2>
      <form
        onSubmit={(event: any) => {
          event.preventDefault();
          const form = event.target;
          const title = form.querySelector('input#title').value;
          const description = form.querySelector('textarea#description').value;
          const month = form.querySelector('select#month').value;
          const day = form.querySelector('select#day').value;
          const year = form.querySelector('select#year').value;
          const hour = form.querySelector('select#hour').value;
          const minutes = form.querySelector('select#minutes').value;
          const ampm = form.querySelector('select#ampm').value;
          const price = Number(form.querySelector('input#price').value);
          const plates = Number(form.querySelector('input#plates').value);
          const date = new Date(
            `${month}/${day}/${year} ${hour}:${minutes} ${ampm}`
          );
          const uid = `${month}_${day}_${year}_${hour}_${minutes}_${ampm}_${user.uid}`;
          const datestamp = date.toUTCString();
          const location = zipcodeToLocation(profile?.personal?.zipcode) || '';
          const ref = `${locationToUrl(location)}_${month}_${year}/${uid}`;
          if (new Date() > date) {
            dispatch({
              type: 'ADD_NOTIFICATION',
              payload: {
                type: 'secondary',
                text: 'Invalid date'
              }
            });
          } else {
            Promise.all([
              new Promise((res, rej) => {
                firebase
                  .database()
                  .ref(`dinners/${ref}`)
                  .set({
                    ...dinnerTemp,
                    ...{
                      ...{ title, price, plates, datestamp, description },
                      profile: user.uid
                    }
                  })
                  .then(response => res())
                  .catch(error => rej(error));
              }),
              new Promise((res, rej) => {
                firebase
                  .database()
                  .ref(`profiles/${user.uid}/hosting/${uid}`)
                  .set(ref)
                  .then(() => res())
                  .catch(error => rej(error));
              })
            ])
              .then(() => {
                dispatch({
                  type: 'ADD_NOTIFICATION',
                  payload: {
                    type: 'primary',
                    text: 'Successfully added your dinner!'
                  }
                });
                window.location.hash = '#/';
              })
              .catch(error => {
                dispatch({
                  type: 'ADD_NOTIFICATION',
                  payload: {
                    type: 'secondary',
                    text: error.message
                  }
                });
              });
          }
        }}
      >
        <label>Address</label>
        <span>
          {profile?.personal?.street} {profile?.personal?.zipcode}
        </span>
        <br />
        <br />
        <label>Title</label>
        <input
          className="brand margin-bottom"
          type="text"
          placeholder="Taco Night"
          id="title"
          required
        />
        <label>Price (USD)</label>
        <input
          className="brand margin-bottom"
          type="number"
          placeholder="8"
          id="price"
          required
        />
        <label>Plates</label>
        <input
          className="brand margin-bottom"
          type="number"
          placeholder="5"
          id="plates"
          required
        />
        <label>Date</label>
        <select
          className="brand margin-right"
          defaultValue={new Date().getMonth() + 1}
          id="month"
        >
          {new Array(12).fill(null).map((value, index) => {
            return (
              <option value={index + 1} key={`month-${index}`}>
                {index + 1}
              </option>
            );
          })}
        </select>
        <select
          className="brand margin-right"
          defaultValue={new Date().getDate()}
          id="day"
        >
          {new Array(31).fill(null).map((value, index) => {
            return (
              <option value={index + 1} key={`month-${index}`}>
                {index + 1}
              </option>
            );
          })}
        </select>
        <select className="brand margin-bottom" id="year">
          <option>2020</option>
        </select>
        <label>Time</label>
        <select className="brand margin-right" defaultValue={'6'} id="hour">
          {new Array(12).fill(null).map((value, index) => {
            return (
              <option value={index + 1} key={`month-${index}`}>
                {index + 1}
              </option>
            );
          })}
        </select>
        <select className="brand margin-right" defaultValue="00" id="minutes">
          <option>00</option>
          <option>15</option>
          <option>30</option>
          <option>45</option>
        </select>
        <select className="brand margin-bottom" defaultValue="PM" id="ampm">
          <option>AM</option>
          <option>PM</option>
        </select>
        <label>Description</label>
        <textarea
          placeholder="Say something about your dinner..."
          className="brand"
          id="description"
          required
        ></textarea>
        <br />
        <br />
        <input className="brand primary-bg" type="submit" value="Post Dinner" />
      </form>
    </div>
  );
};

export default CreateComponent;
