import React from 'react';
import { Switch, Route } from 'react-router';
import ScrollUpButton from 'react-scroll-up-button';
import Helmet from 'react-helmet';
import AuthPage from 'pages/AuthPage';
import ChatPage from 'pages/ChatPage';
import DoctorPage from 'pages/DoctorPage';
import PatientPage from 'pages/PatientPage';
import { Redirect } from 'react-router';

const routers = (
  <React.Fragment>
    <Helmet titleTemplate="Medicine - %s"/>
    <Switch>
      <Route exact path="/" component={AuthPage}/>
      <Route exact path="/chat" component={ChatPage}/>
      <Route exact path="/doctor" component={DoctorPage}/>
      <Route exact path="/patient" component={PatientPage}/>
    </Switch>
    <ScrollUpButton/>
  </React.Fragment>
);

export default routers;
