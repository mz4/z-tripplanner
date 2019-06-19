import React from 'react';
import PropTypes from 'prop-types';

const Counter = (props) => {
  const { setConfirmed, setUnConfirmed, setAll, showConfirmed, showUnConfirmed, showAll } = props;
  return (
    <div className="counter">

    <div className={"counter__type " + (showAll ? "counter__type--selected" : "")} onClick={setAll}>
      <div className="counter__type__title">
        All
      </div>
      <div className="counter__type__value">
        {props.totalTrips}
      </div>
    </div>

    <div className={"counter__type " + (showConfirmed ? "counter__type--selected" : "")} onClick={setConfirmed}>
      <div className="counter__type__title">
        Confirmed
      </div>
      <div className="counter__type__value">
        {props.numberConfirmed}
      </div>
    </div>

    <div className={"counter__type " + (showUnConfirmed ? "counter__type--selected" : "")} onClick={setUnConfirmed}>
      <div className="counter__type__title">
        Unconfirmed
      </div>
      <div className="counter__type__value">
        {props.numberUnconfirmed}
      </div>
    </div>

  </div>
  )
}

Counter.propTypes = {
  numberConfirmed: PropTypes.number,
  numberUnconfirmed: PropTypes.number,
  totalTrips: PropTypes.number,
  setConfirmed: PropTypes.func.isRequired,
  setUnConfirmed: PropTypes.func.isRequired,
  setAll: PropTypes.func.isRequired,
  showConfirmed: PropTypes.bool.isRequired,
  showUnConfirmed: PropTypes.bool.isRequired,
  showAll: PropTypes.bool.isRequired,
};

export default Counter;
