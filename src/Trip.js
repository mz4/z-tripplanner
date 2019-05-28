import React from 'react';
import PropTypes from 'prop-types';

import TripName from './TripName';
import TripDate from './TripDate';

const Trip = props =>
  <li>
    <TripName
      isEditing={props.isEditing}
      handleNameEdits={e => props.setName(e.target.value)}>
      {props.name}
    </TripName>
    <TripDate
        isEditing={props.isEditing}
        handleDateEdits={e => props.setDateStart(e.target.value)}>
      {props.dateStart}
    </TripDate>
    <TripDate
        isEditing={props.isEditing}
        handleDateEdits={e => props.setDateEnd(e.target.value)}>
      {props.dateEnd}
    </TripDate>
    <label>
      <input
        type="checkbox"
        checked={props.isConfirmed}
        onChange={props.handleConfirmation} /> Confirmed
    </label>
    <button onClick={props.handeToggleEditing}>
      {props.isEditing ? "save" : "edit"}
    </button>
    <button onClick={props.handleRemove}>remove</button>
  </li>;

Trip.propTypes = {
  name: PropTypes.string.isRequired,
  dateStart: PropTypes.string.isRequired,
  dateEnd: PropTypes.string.isRequired,
  isConfirmed: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  handleConfirmation: PropTypes.func.isRequired,
  handeToggleEditing: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  setDateStart: PropTypes.func.isRequired,
  setDateEnd: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired
};

export default Trip;
