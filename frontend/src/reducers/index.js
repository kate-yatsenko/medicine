import { combineReducers } from 'redux';
import authState from './authState';
import doctorState from './doctorState';
import patientState from './patientState';
import chatState from './chatState';
import mapState from './mapState';

const appState = combineReducers({
  authState,
  doctorState,
  patientState,
  chatState,
  mapState,
})

export default appState
