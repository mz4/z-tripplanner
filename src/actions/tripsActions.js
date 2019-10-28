import axios from 'axios';
import * as types from '../constants/actionTypes';
import getAPIUrl from '../constants/serverAPI';

export const tripsList = (trips) => {
  return {
    type: types.TRIPS,
    data: trips
  }
}

export const setTripNameDispatcher = (trip) => {
  return {
    type: types.TRIPNAME,
    data: trip
  }
}

export const setTripDateStartDispatcher = (trip) => {
  return {
    type: types.TRIPDATESTART,
    data: trip
  }
}

export const setTripDateEndDispatcher = (trip) => {
  return {
    type: types.TRIPDATEEND,
    data: trip
  }
}

export const tripsListDispatcher = (token) => {
  return (dispatch) => {
    const host = getAPIUrl();
    const url = 'api/trip';
    return axios
      .get(host + url, { headers: {"Authorization" : `Bearer ${token}`} })
      .then(data => {
        dispatch(tripsList(data.data.docs));
      })
      .catch(error => {
        throw error;
      });
  };
};