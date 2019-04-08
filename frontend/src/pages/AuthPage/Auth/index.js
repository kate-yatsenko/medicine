import React from 'react';
import { Link } from 'react-router-dom';

const Auth = () => {
  return (
    <div>
      <h1>Auth</h1>
      <hr/>
      <Link to="/chat">
        Chat
      </Link>
      <hr/>
      <Link to="/doctor">
        Doctor
      </Link>
      <hr/>
      <Link to="/patient">
        Patient
      </Link>
    </div>
  );
};

export default Auth;
