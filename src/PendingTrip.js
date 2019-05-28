import React from 'react';
import PropTypes from 'prop-types';

const PendingTrip = props => {
  if (props.name) {
    return (
      <li className="pending">
        <span>
          {props.name}
        </span>
      </li>
    );
  }
  return null;
};

PendingTrip.propTypes = {
  name: PropTypes.string.isRequired
};

export default PendingTrip;
