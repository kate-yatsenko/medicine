import React from 'react';
import Helmet from 'react-helmet';
import Home from './Home'

const AuthPage = (props) => {
  return (
    <React.Fragment>
      <Helmet title="Home Page"/>
      <Home {...props} />
    </React.Fragment>
  );
};

export default AuthPage;
