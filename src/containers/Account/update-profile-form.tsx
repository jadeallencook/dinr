import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import updateProfileHandler from '../../handlers/update-profile';

const UpdateProfileForm: React.FC = () => {
  const user = useSelector(state => state['user']);
  const profile = useSelector(state => state['profile']);
  const [name, setName] = useState(profile?.personal?.name || '');
  const [street, setStreet] = useState(profile?.personal?.street || '');
  const [zipcode, setZipcode] = useState(profile?.personal?.zipcode || '');
  const dispatch = useDispatch();

  useEffect(() => {
    setName(profile?.personal?.name || '');
    setStreet(profile?.personal?.street || '');
    setZipcode(profile?.personal?.zipcode || '');
  }, [profile]);

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        updateProfileHandler({
          name,
          street,
          zipcode,
          uid: user.uid
        }).then((message: string) =>
          dispatch({
            type: 'ADD_NOTIFICATION',
            payload: {
              type: 'primary',
              text: message
            }
          })
        );
      }}
    >
      <label>Name</label>
      <input
        type="text"
        className="brand margin-bottom"
        value={name}
        onChange={event => setName(event.target.value)}
      />
      <label>Location</label>
      <input
        type="text"
        className="brand margin-bottom"
        value={street}
        onChange={event => setStreet(event.target.value)}
      />
      <label>Zipcode</label>
      <input
        type="number"
        className="brand margin-bottom"
        min="10000"
        max="99999"
        value={zipcode}
        onChange={event => setZipcode(event.target.value)}
      />
      <br />
      <p>
        <small>
          <b>All information, except for email, is made public.</b>
        </small>
      </p>
      <br />
      <input
        className="brand primary-bg margin-right margin-bottom"
        type="submit"
        value="Save Changes"
      />
    </form>
  );
};

export default UpdateProfileForm;
