import React from 'react';
import { Switch, Route } from 'react-router';
import ScrollUpButton from 'react-scroll-up-button';
import Helmet from 'react-helmet';
import HomePage from 'pages/HomePage';
import { ChatPage } from 'pages/ChatPage';
import DoctorPage from 'pages/DoctorPage';
import PatientPage from 'pages/PatientPage';
import ButtonCommunication from 'components/ButtonCommunication';
import PrivateRoute from 'helpers/PrivateRoute';

const routers = (
  <React.Fragment>
    <Helmet titleTemplate="Medicine - %s"/>
    <Switch>
      <Route exact path="/" component={HomePage}/>
      <PrivateRoute exact path="/chat" component={ChatPage}/>
      <PrivateRoute exact path="/doctor" component={DoctorPage}/>
      <PrivateRoute exact path="/patient" component={PatientPage}/>
    </Switch>
    <ButtonCommunication/>
    <ScrollUpButton/>
  </React.Fragment>
);

export default routers;
