import React from 'react';
import PropTypes from 'prop-types';

const Counter = (props) => {
  const { setConfirmed, confirmed } = props;
  return (
    <div className="counter">

      <div className={"counter__type " + ((confirmed=='') ? "counter__type--selected" : "")} onClick={() => setConfirmed('')}>
        <div className="counter__type__title">
          All
        </div>
        <div className="counter__type__value">
          {props.totalTrips}
        </div>
      </div>

      <div className={"counter__type " + (confirmed === 'confirmed' ? "counter__type--selected" : "")} onClick={() => setConfirmed('confirmed')}>
        <div className="counter__type__title">
          Confirmed
        </div>
        <div className="counter__type__value">
          {props.numberConfirmed}
        </div>
      </div>

      <div className={"counter__type " + ((confirmed === 'unconfimed') ? "counter__type--selected" : "")} onClick={() => setConfirmed('unconfirmed')}>
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
  confirmed: PropTypes.string.isRequired,
};

export default Counter;
