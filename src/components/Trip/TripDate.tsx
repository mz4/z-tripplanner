import React from 'react';
import PropTypes from 'prop-types';

interface tripDateProps {
  isEditing: boolean,
  handleDateEdits: any,
  children: any
};

const TripDate = (props: tripDateProps) => {
  if (props.isEditing) {
    return (
      <input
        type="text"
        value={props.children}
        onChange={props.handleDateEdits} />
    );
  }

  return (
    <span>
      {props.children}
    </span>
  );
};

TripDate.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  handleDateEdits: PropTypes.func.isRequired
};

export default TripDate;
