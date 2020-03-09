import React from 'react';
import './style.scss';
import firebase from 'firebase/app';
import 'firebase/database';
import { useSelector, useDispatch } from 'react-redux';
import zipcodeToLocation from '../../helpers/zipcode-to-location';
import locationToUrl from '../../helpers/location-to-url';
import dinnerHashToObject from '../../helpers/dinner-hash-to-object';
import dinnerTemp from '../../templates/dinner.json';
import filterHosting from '../../helpers/filter-hosting';

const CreateComponent: React.FC = () => {
  const profile = useSelector(state => state['profile']);
  const user = useSelector(state => state['user']);
  const dinner = useSelector(state => state['dinner']);
  const dispatch = useDispatch();
  const loaded = dinnerHashToObject(window.location.hash);
  if (loaded && !dinner) {
    window.location.hash = '/error';
  }

  const formHandler = (event: any) => {
    const action: string | null = document.activeElement
      ? document.activeElement.getAttribute('data-action')
      : '';
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
    const datestamp = `${month}/${day}/${year} ${hour}:${minutes} ${ampm}`;
    const uid = `${month}_${day}_${year}_${hour}_${minutes}_${ampm}_${user.uid}`;
    const location = zipcodeToLocation(profile?.personal?.zipcode) || '';
    const ref = `${locationToUrl(location)}_${month}_${year}/${uid}`;
    if (new Date() > new Date(datestamp)) {
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          type: 'secondary',
          text: 'Invalid date'
        }
      });
    } else if (isNaN(price)) {
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          type: 'secondary',
          text: 'Invalid price'
        }
      });
    } else if (isNaN(plates)) {
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          type: 'secondary',
          text: 'Invalid plates'
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
                ...{
                  title,
                  price,
                  plates,
                  datestamp,
                  description
                },
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
              text:
                action === 'save'
                  ? 'Successfully saved your dinner!'
                  : 'Successfully added your dinner!'
            }
          });
          dispatch({
            type: 'GET_HOSTING',
            payload: filterHosting(profile.hosting)
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
  };

  return (
    <div className="CreateComponent container">
      <h2>Host Dinner</h2>
      <form onSubmit={formHandler}>
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
          defaultValue={loaded && dinner ? dinner.title : ''}
          required
        />
        <label>Price (USD)</label>
        <input
          className="brand margin-bottom"
          type="number"
          placeholder="8"
          id="price"
          required
          defaultValue={loaded && dinner ? dinner.price : ''}
        />
        <label>Plates</label>
        <input
          className="brand margin-bottom"
          type="number"
          placeholder="5"
          id="plates"
          required
          disabled={!!loaded}
          defaultValue={loaded && dinner ? dinner.plates : ''}
        />
        <label>Date</label>
        <select
          className="brand margin-right"
          defaultValue={new Date().getMonth() + 1}
          id="month"
          disabled={!!loaded}
        >
          {new Array(12).fill(null).map((value, index) => {
            return (
              <option
                key={`month-${index}`}
                defaultValue={loaded ? loaded.month : index + 1}
              >
                {index + 1}
              </option>
            );
          })}
        </select>
        <select
          className="brand margin-right"
          defaultValue={loaded ? loaded.day : new Date().getDate()}
          id="day"
          disabled={!!loaded}
        >
          {new Array(31).fill(null).map((value, index) => {
            return (
              <option value={index + 1} key={`month-${index}`}>
                {index + 1}
              </option>
            );
          })}
        </select>
        <select className="brand margin-bottom" id="year" disabled={!!loaded}>
          <option>2020</option>
        </select>
        <label>Time</label>
        <select
          className="brand margin-right"
          defaultValue={'6'}
          id="hour"
          disabled={!!loaded}
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
          defaultValue={loaded ? loaded.minute : '00'}
          id="minutes"
          disabled={!!loaded}
        >
          <option value="00">00</option>
          <option value="15">15</option>
          <option value="30">30</option>
          <option value="45">45</option>
        </select>
        <select
          className="brand margin-bottom"
          defaultValue={loaded ? loaded.ampm : 'PM'}
          id="ampm"
          disabled={!!loaded}
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
        <label>Description</label>
        <textarea
          placeholder="Say something about your dinner..."
          className="brand"
          id="description"
          defaultValue={loaded && dinner ? dinner.description : ''}
          required
        ></textarea>
        <br />
        <br />
        {loaded && dinner ? (
          <input
            className="brand primary-bg"
            data-action="save"
            type="submit"
            value="Save Dinner"
          />
        ) : (
          <input
            className="brand primary-bg"
            data-action="post"
            type="submit"
            value="Post Dinner"
          />
        )}
      </form>
    </div>
  );
};

export default CreateComponent;
