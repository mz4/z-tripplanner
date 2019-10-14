import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import './index.css';
import App from './App';

const initialState = {
    trips: [],
  }

const store = configureStore(initialState);

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById("app")
);