import gql from 'graphql-tag';

// GET TRIPS
export const GET_TRIPS = gql`
  {
    trips {
      id
      name
      dateStart
      dateEnd
      isConfirmed
      isEditing
    }
  }
`

// SUBSCRIPTION NEW TRIP
export const NEW_TRIPS_SUBSCRIPTION = gql`
  subscription TripAdded {
    newTrip {
      id
      name
      dateStart
      dateEnd
      isConfirmed
      isEditing
    }
  }
`

// SUBSCRIPTION DELETE TRIP
export const DELETE_TRIP_SUBSCRIPTION = gql`
  subscription deleteTrip {
    deleteTrip {
      id
      name
      dateStart
      dateEnd
      isConfirmed
      isEditing
    }
  }
`;

// SUBSCRIPTION TOGGLE TRIP
export const TOGGLE_TRIP_SUBSCRIPTION = gql`
  subscription toggleTrip {
    toggleTrip {
      id
      name
      dateStart
      dateEnd
      isConfirmed
      isEditing
    }
  }
`;