import React from 'react';
import PropTypes from 'prop-types';

import Trip from './Trip';

const TripList = props => 
  <>
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
          key={trip.id}
          keyid={trip.id}
        />)
      )
    }
  </>;

TripList.propTypes = {
  trips: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  showConfirmed: PropTypes.bool.isRequired,
  showUnConfirmed: PropTypes.bool.isRequired,
  showAll: PropTypes.bool.isRequired
};

export default TripList;
