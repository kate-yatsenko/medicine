import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authActions from 'actions/authActions';
import Helmet from 'react-helmet';
import Auth from './Home'

function mapStateToProps({ authState }) {
  return { ...authState };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...authActions,
  }, dispatch);
}

const AuthPage = (props) => {
  return (
    <React.Fragment>
      <Helmet title="Auth"/>
      <Auth {...props} />
    </React.Fragment>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
