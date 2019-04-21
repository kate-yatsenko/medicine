import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedApp } from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import appState from './reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import "antd/dist/antd.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import './resources/AntDesign/antd.cleanui.scss';
import './style.scss';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  appState, 
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ConnectedApp/>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
