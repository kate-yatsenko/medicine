import React from 'react';
import Helmet from 'react-helmet';
import Doctor from './Doctor'

const DoctorPage = (props) => {
  return (
    <React.Fragment>
      <Helmet title="Doctor"/>
      <Doctor {...props} />
    </React.Fragment>
  );
};

export default DoctorPage;