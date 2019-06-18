import React from 'react';
import PropTypes from 'prop-types';

const Counter = props =>
  <div className="counter">
    <div className="counter__type">
      <div className="counter__type__title">
        Confirmed
      </div>
      <div className="counter__type__value">
        {props.numberConfirmed}
      </div>
    </div>
    <div className="counter__type">
      <div className="counter__type__title">
        Unconfirmed
      </div>
      <div className="counter__type__value">
        {props.numberUnconfirmed}
      </div>
    </div>
    <div className="counter__type">
      <div className="counter__type__title">
        Total
      </div>
      <div className="counter__type__value">
        {props.totalTrips}
      </div>
    </div>
  </div>;

Counter.propTypes = {
  numberConfirmed: PropTypes.number,
  numberUnconfirmed: PropTypes.number,
  totalTrips: PropTypes.number
};

export default Counter;
