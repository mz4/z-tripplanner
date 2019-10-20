import React from 'react';
import PropTypes from 'prop-types';

interface tripNameProps {
  isEditing: boolean,
  handleNameEdits: any,
  children: any
};

const TripName = (props: tripNameProps) => {
  if (props.isEditing) {
    return (
      <input
        type="text"
        value={props.children}
        onChange={props.handleNameEdits} />
    );
  }

  return (
    <span>
      {props.children}
    </span>
  );
};

TripName.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  handleNameEdits: PropTypes.func.isRequired
};

export default TripName;
