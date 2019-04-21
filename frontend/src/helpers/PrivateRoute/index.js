import React from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';

function mapStateToProps({ authState }) {
  return {
    token: authState.token,
  };
}

const PrivateRoute = ({ component: Component, token, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        token
          ? (
            <Component {...props}/>
          )
          : (
            <Redirect to="/"/>
          )
      }
    />
  );
};

export default connect(mapStateToProps)(PrivateRoute);
