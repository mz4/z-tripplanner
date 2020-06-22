import React from 'react';
import PropTypes from 'prop-types';

import Trip from '../Trip/Trip';

const TripList = props => 
{
  return (
  <>
    {
      props.trips
      .filter(trip => 
        (props.confirmed == 'confirmed') ? trip.isConfirmed : 
        (props.confirmed == 'unconfirmed') ? !trip.isConfirmed : 
        (props.confirmed == '') ? true : false)
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
  </>)
}

TripList.propTypes = {
  trips: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  confirmed: PropTypes.string.isRequired
};

export default TripList;
