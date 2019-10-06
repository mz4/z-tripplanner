import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import './index.css';
import App from './App';

const initialState = {
  trips: [
    {
      id: 0,
      key: 0,
      name: 'Rome',
      dateStart: '19/08/2019',
      dateEnd: '29/08/2019',
      isConfirmed: false,
      isEditing: false
    },
    {
      id: 1,
      key: 1,
      name: 'Paris',
      dateStart: '15/06/2019',
      dateEnd: '29/06/2019',
      isConfirmed: true,
      isEditing: false
    },
    {
      id: 2,
      key: 2,
      name: 'Malta',
      dateStart: '01/02/2019',
      dateEnd: '08/02/2019',
      isConfirmed: false,
      isEditing: false
    },
    {
      id: 3,
      key: 3,
      name: 'Budapest',
      dateStart: '01/02/2019',
      dateEnd: '08/02/2019',
      isConfirmed: false,
      isEditing: false
    }
  ],
}

const store = configureStore(initialState);

render(
  <Provider store={store}>
    <App 
      trips={
        [{
          id: 0,
          dateStart: '',
          dateEnd: '',
          isConfirmed: false,
          isEditing: false,
        }]
      }
      tripsListLoad= {()=>{}}
    />
  </Provider>,
  document.getElementById("app")
);