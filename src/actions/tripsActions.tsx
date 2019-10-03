import * as types from '../constants/actionTypes';
import axios from 'axios';
import getAPIUrl from '../constants/serverAPI';

export const tripsList = (bool) => {
  return {
    type: types.TRIPS,
    data: bool
  }
}

export const tripsListDispatcher = () => {
  return dispatch => {
    dispatch(tripsList(true));
  }
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