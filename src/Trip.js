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
        handleDateStartEdits={e => props.setDateStart(e.target.value)}>
      {props.dateStart}
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
  isConfirmed: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  handleConfirmation: PropTypes.func.isRequired,
  handeToggleEditing: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  setDateStart: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired
};

export default Trip;
