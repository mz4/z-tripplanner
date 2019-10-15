import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store/configureStore';
import './index.css';
import App from './App';
import AppRouter from './App';

const initialState = {
    trips: [],
  }

const store = configureStore(initialState);

render(
  <Provider store={store}>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </Provider>,
  document.getElementById("app")
);