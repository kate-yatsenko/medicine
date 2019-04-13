import React from 'react';
import Helmet from 'react-helmet';
import Patient from './Patient'

const PatientPage = (props) => {
  return (
    <React.Fragment>
      <Helmet title="Patient"/>
      <Patient {...props} />
    </React.Fragment>
  );
};

export default PatientPage;