import React from 'react';
import PropTypes from 'prop-types';

const Counter = props =>
  <table className="counter">
    <tbody>
      <tr>
        <td>Confirmed:</td>
        <td>{props.numberConfirmed}</td>
      </tr>
      <tr>
        <td>Unconfirmed:</td>
        <td>{props.numberUnconfirmed}</td>
      </tr>
      <tr>
        <td>Total:</td>
        <td>{props.totalTrips}</td>
      </tr>
    </tbody>
  </table>;

Counter.propTypes = {
  numberConfirmed: PropTypes.number,
  numberUnconfirmed: PropTypes.number,
  totalTrips: PropTypes.number
};

export default Counter;
