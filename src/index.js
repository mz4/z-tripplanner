import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './index.css';
import App from './App';
import TripReducer from './reducers/tripsReducer';

const store = createStore(
  TripReducer,
  window.devToolsExtension && window.devToolsExtension()
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);