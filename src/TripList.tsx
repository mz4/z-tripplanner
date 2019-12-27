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
          id={trip.id}
          name={trip.name}
          dateStart={trip.dateStart}
          dateEnd={trip.dateEnd}
          isConfirmed={trip.isConfirmed}
          isEditing={trip.isEditing}
          handleConfirmation={() => props.toggleConfirmationAt(trip.id, trip.isConfirmed)}
          handleToggleEditing={() => props.toggleEditingAt(trip.id, trip.isEditing)}
          handleEditingSave={() => props.saveEditingAt(trip)}
          setName={text => props.setNameAt(text, trip.id)}
          setDateStart={text => props.setDateStartAt(text, trip.id)}
          setDateEnd={text => props.setDateEndAt(text, trip.id)}
          key={trip.id}
          keyid={trip.id}
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
  name: PropTypes.string.isRequired,
  showConfirmed: PropTypes.bool.isRequired,
  showUnConfirmed: PropTypes.bool.isRequired,
  showAll: PropTypes.bool.isRequired
};

export default TripList;
