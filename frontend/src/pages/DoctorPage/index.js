import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as doctorActions from 'actions/doctorActions';
import Helmet from 'react-helmet';
import Doctor from './Doctor'

function mapStateToProps({ doctorState }) {
  return { ...doctorState };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...doctorActions,
  }, dispatch);
}

const DoctorPage = (props) => {
  return (
    <React.Fragment>
      <Helmet title="Doctor"/>
      <Doctor {...props} />
    </React.Fragment>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorPage);