import React from 'react';
import './style.scss';

const AccountComponent: React.FC = () => {
  return (
    <div className="AccountComponent container">
      <h2>Let's get cookin!</h2>
      <form>
        <label>Email</label>
        <input type="text" className="brand brand-bg" placeholder="email@domain.com" />
        <br /><br />
        <label>Password</label>
        <input type="password" className="brand brand-bg" placeholder="••••••••••" />
        <br /><br />
        <span>Forgot password?</span>
        <br /><br />
        <input type="submit" className="brand brand-bg" value="Sign In" />
        <br /><br />
        <button className="brand secondary-bg">Create Account</button>
        <br /><br />
      </form>
    </div>
  );
};

export default AccountComponent;
