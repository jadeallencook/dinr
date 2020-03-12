import React, { useState } from 'react';
import createAccountHandler from '../../handlers/create-account';
import { useDispatch } from 'react-redux';

const CreateAccountForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reenter, setReenter] = useState('');
  const [zipcode, setZipcode] = useState('');
  const dispatch = useDispatch();

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        createAccountHandler({
          email,
          password,
          reenter,
          zipcode
        })
          .then((message: string) => '')
          .catch((message: string) =>
            dispatch({
              type: 'ADD_NOTIFICATION',
              payload: {
                type: 'secondary',
                text: message
              }
            })
          );
      }}
    >
      <h2>Let's Get Cooking!</h2>
      <label>Email</label>
      <input
        type="email"
        className="brand"
        value={email}
        onChange={event => setEmail(event.target.value)}
      />
      <br />
      <br />
      <label>ZIP Code</label>
      <input
        type="number"
        className="brand"
        value={zipcode}
        onChange={event => setZipcode(event.target.value)}
      />
      <br />
      <br />
      <label>Password</label>
      <input
        type="password"
        className="brand"
        value={password}
        onChange={event => setPassword(event.target.value)}
      />
      <br />
      <br />
      <label>Reenter Password</label>
      <input
        type="password"
        className="brand margin-bottom"
        value={reenter}
        onChange={event => setReenter(event.target.value)}
      />
      <br />
      <br />
      <input
        className="brand primary-bg margin-right margin-bottom"
        type="submit"
        value="Sign Up"
      />
    </form>
  );
};

export default CreateAccountForm;
