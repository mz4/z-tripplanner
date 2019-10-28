import React from 'react';
import PropTypes from 'prop-types';
import TripName from './TripName';
import TripDate from './TripDate';

const Trip = props =>
  <div key={props.keyid} className="row">
    <div className="col-md-10">
      <div className="trip">
        <div>
          <TripName
            isEditing={props.isEditing}
            handleNameEdits={e => props.setName(e.target.value, props.id)}
            >
            {props.name}
          </TripName>
        </div>
        <div>
          <TripDate
            isEditing={props.isEditing}
            handleDateEdits={e => props.setDateStart(e.target.value, props.id)}>
            {props.dateStart}
          </TripDate>
        </div>
        <div>
          <TripDate
            isEditing={props.isEditing}
            handleDateEdits={e => props.setDateEnd(e.target.value, props.id)}>
            {props.dateEnd}
          </TripDate>
        </div>
        <div className="checkboxes">
          <label>
            <input
              type="checkbox"
              checked={props.isConfirmed}
              onChange={props.handleConfirmation} />
            <span className="confirmed">Confirmed</span>
          </label>
        </div>
        {props.isEditing ? 
          <button onClick={props.handleEditingSave}>
            Save
          </button>
          : 
          <button onClick={props.handleToggleEditing}>
            Edit
          </button>
        }
        <button
          onClick={props.handleRemove}>
          Remove
        </button>
      </div>
    </div>
  </div>;

Trip.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  dateStart: PropTypes.string.isRequired,
  dateEnd: PropTypes.string.isRequired,
  isConfirmed: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  handleConfirmation: PropTypes.func.isRequired,
  handleToggleEditing: PropTypes.func.isRequired,
  handleEditingSave: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  setDateStart: PropTypes.func.isRequired,
  setDateEnd: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  key: PropTypes.any,
  keyid: PropTypes.any,
};

export default Trip;
