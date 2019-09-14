import * as types from '../constants/actionTypes';
import axios from 'axios';
import getAPIUrl from '../constants/serverAPI';

export const tripsList = (data) => {
  return {
    type: types.TRIPS,
    data
  }
}

export const tripsListLoad = () => {
  dispatch(tripsList(data));
  // return (dispatch) = () => {
  //   const host = getAPIUrl();
  //   const url = 'api/v1/trips';
  //   return axios
  //     .get(host + url)
  //     .then(data => {
  //       dispatch(tripsList(data));
  //     })
  //     .catch(error => {
  //       throw error;
  //     });
  // };
};