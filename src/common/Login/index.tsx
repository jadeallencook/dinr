import React from 'react';
import './style.scss';

const LoginComponent: React.FC = () => {
  return (
    <div className="LoginComponent">
      <h2>Let's get cookin!</h2>
      <form>
        <label>Email</label>
        <input
          type="text"
          className="brand brand-bg"
          placeholder="email@domain.com"
        />
        <label>Password</label>
        <input
          type="password"
          className="brand brand-bg"
          placeholder="••••••••••"
        />
        <span>Forgot password?</span>
        <input type="submit" className="brand brand-bg" value="Sign In" />
        <button className="brand secondary-bg">Create Account</button>
      </form>
    </div>
  );
};

export default LoginComponent;
