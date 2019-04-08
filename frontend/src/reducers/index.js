import { combineReducers } from 'redux';
import authState from './authState';
import doctorState from './doctorState';
import patientState from './patientState';
import chatState from './chatState';

const appState = combineReducers({
  authState,
  doctorState,
  patientState,
  chatState,
})

export default appState