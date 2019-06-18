import React from 'react';
import PropTypes from 'prop-types';

import Trip from './Trip';
import PendingTrip from './PendingTrip';

const TripList = props =>
  <ul>
    <PendingTrip name={props.pendingTrip} />
    {
      props.trips
      .map((trip, index) =>
        <Trip
          key={index}
          name={trip.name}
          dateStart={trip.dateStart}
          dateEnd={trip.dateEnd}
          isConfirmed={trip.isConfirmed}
          isEditing={trip.isEditing}
          handleConfirmation={() => props.toggleConfirmationAt(index)}
          handeToggleEditing={() => props.toggleEditingAt(index)}
          setName={text => props.setNameAt(text, index)}
          setDateStart={text => props.setDateStartAt(text, index)}
          setDateEnd={text => props.setDateEndAt(text, index)}
          handleRemove={() => props.removeTripAt(index)} />
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
  showAll: PropTypes.bool.isRequired,
  removeTripAt: PropTypes.func.isRequired,
  pendingTrip: PropTypes.string.isRequired
};

export default TripList;
