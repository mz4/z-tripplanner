import React from 'react';
import PropTypes from 'prop-types';

const PendingTrip = props => {
  if (props.name) {
    return (
      <div className="pending">
          {props.name}
      </div>
    );
  }
  return null;
};

PendingTrip.propTypes = {
  name: PropTypes.string.isRequired
};

export default PendingTrip;
