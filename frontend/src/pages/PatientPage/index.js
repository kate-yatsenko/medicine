import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as patientActions from 'actions/patientActions';
import Helmet from 'react-helmet';
import Patient from './Patient'
import {Menu, Dropdown, Icon, Button } from 'antd';

function mapStateToProps({ patientState }) {
  return { ...patientState };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...patientActions,
  }, dispatch);
}

const PatientPage = (props) => {
  return (
    <React.Fragment>
      <Helmet title="Patient"/>
      <Patient {...props} />
    </React.Fragment>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientPage);