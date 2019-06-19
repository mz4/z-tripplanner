import React from 'react';
import PropTypes from 'prop-types';

import Trip from './Trip';
import PendingTrip from './PendingTrip';

const TripList = props =>
  <ul>
    <PendingTrip name={props.pendingTrip} />
    {
      props.trips
      .filter(trip => {
        if (trip.isConfirmed === true && props.showConfirmed === true) {
          return true
        } 
        if (trip.isConfirmed === false && props.showUnConfirmed === true) {
          return true
        }        
        else {
          return false
        }
      })
      .map((trip, index) =>
        <Trip
          key={index}
          name={trip.name}
          dateStart={trip.dateStart}
          dateEnd={trip.dateEnd}
          isConfirmed={trip.isConfirmed}
          isEditing={trip.isEditing}
          handleConfirmation={() => props.toggleConfirmationAt(trip.id)}
          handeToggleEditing={() => props.toggleEditingAt(trip.id)}
          setName={text => props.setNameAt(text, trip.id)}
          setDateStart={text => props.setDateStartAt(text, trip.id)}
          setDateEnd={text => props.setDateEndAt(text, trip.id)}
          handleRemove={() => props.removeTripAt(trip.id)} />
      )
    }
  </ul>;

TripList.propTypes = {
  trips: PropTypes.array.isRequired,
  toggleConfirmationAt: PropTypes.func.isRequired,
  toggleEditingAt: PropTypes.func.isRequired,
  setNameAt: PropTypes.func.isRequired,
  setDateStartAt: PropTypes.func.isRequired,
  setDateEndAt: PropTypes.func.isRequired,
  showConfirmed: PropTypes.bool.isRequired,
  showUnConfirmed: PropTypes.bool.isRequired,
  removeTripAt: PropTypes.func.isRequired,
  pendingTrip: PropTypes.string.isRequired
};

export default TripList;
