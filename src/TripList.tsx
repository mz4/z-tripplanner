import React from 'react';
import PropTypes from 'prop-types';

import Trip from './Trip';

const TripList = props => 
  <div>
    {
      props.trips
      .filter(trip => {
        if (trip.isConfirmed === true && props.showConfirmed === true) {
          return true
        } 
        if (trip.isConfirmed === false && props.showUnConfirmed === true) {
          return true
        }
        if (props.showAll) {
          return true
        }      
        else {
          return false
        }
      })
      .map(trip =>
        (<Trip
          id={trip._id}
          name={trip.name}
          dateStart={trip.dateStart}
          dateEnd={trip.dateEnd}
          isConfirmed={trip.isConfirmed}
          isEditing={trip.isEditing}
          handleConfirmation={() => props.toggleConfirmationAt(trip._id, trip.isConfirmed)}
          handleToggleEditing={() => props.toggleEditingAt(trip._id, trip.isEditing)}
          handleEditingSave={() => props.saveEditingAt(trip)}
          setName={text => props.setNameAt(text, trip._id)}
          setDateStart={text => props.setDateStartAt(text, trip._id)}
          setDateEnd={text => props.setDateEndAt(text, trip._id)}
          handleRemove={() => props.removeTripAt(trip._id)}
          key={trip._id}
          keyid={trip._id}
        />)
      )
    }
  </div>;

TripList.propTypes = {
  trips: PropTypes.array.isRequired,
  toggleConfirmationAt: PropTypes.func.isRequired,
  toggleEditingAt: PropTypes.func.isRequired,
  saveEditingAt: PropTypes.func.isRequired,
  setNameAt: PropTypes.func.isRequired,
  setDateStartAt: PropTypes.func.isRequired,
  setDateEndAt: PropTypes.func.isRequired,
  removeTripAt: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  showConfirmed: PropTypes.bool.isRequired,
  showUnConfirmed: PropTypes.bool.isRequired,
  showAll: PropTypes.bool.isRequired
};

export default TripList;
