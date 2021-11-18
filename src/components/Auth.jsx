import React, { useContext } from 'react';

import Card from './UI/Card';
import './Auth.css';
import { AuthContext } from '../context/auth-context';

const Auth = (props) => {
  console.log('Rerender of auth');
  const value = useContext(AuthContext);
  const loginHandler = () => {
    value.login();
  };

  return (
    <div className="auth">
      <Card>
        <h2>You are not authenticated!</h2>
        <p>Please log in to continue.</p>
        <form>
          <input type="text" placeholder="Email"/>
          <input type="text" placeholder="Password"/>
        </form>
        <button onClick={loginHandler}>Log In</button>
      </Card>
    </div>
  );
};

export default Auth;
