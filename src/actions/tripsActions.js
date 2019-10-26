import * as types from '../constants/actionTypes';
import axios from 'axios';
import getAPIUrl from '../constants/serverAPI';

export const tripsList = (trips) => {
  return {
    type: types.TRIPS,
    data: trips
  }
}

export const tripsListDispatcher = (token) => {
  console.log('GETTRIPS')
  return (dispatch) => {
    const host = getAPIUrl();
    const url = 'api/trip';
    return axios
      .get(host + url, { headers: {"Authorization" : `Bearer ${token}`} })
      .then(data => {
        console.log('TRIPSLIST!!!!!!>', JSON.stringify(data.data.docs));
        dispatch(tripsList(data.data.docs));
      })
      .catch(error => {
        throw error;
      });
  };
};