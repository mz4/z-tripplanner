import * as TripActionType from '../constants/actionTypes';
import objectAssign from 'object-assign';

export default function TripReducer(state = [], action) {

  switch (action.type) {
    case TripActionType.ADD_TRIP: {
      const addTripsList = [...state.trips, {
        id: 4,
        key: 4,
        name: action.name,
        dateStart: '01/02/2019',
        dateEnd: '08/02/2019',
        isConfirmed: false,
        isEditing: false
      }];
      return {
        ...state,
        players: addTripsList
      };
    }

    case TripActionType.TRIPS: {
      return { ...state, trips: action.data };
    }

    case TripActionType.TRIPNAME: {
      const updateTripsList = state.trips.map((trip, index) => {
        if (trip._id === action.data.id) {
          return {
            ...trip,
            name: action.data.name
          };
        }
        return trip;
      });
      return {
        ...state,
        trips: updateTripsList
      };
    }

    case TripActionType.TRIPDATESTART: {
      const updateTripsList = state.trips.map((trip, index) => {
        if (trip._id === action.data.id) {
          return {
            ...trip,
            dateStart: action.data.dateStart
          };
        }
        return trip;
      });
      return {
        ...state,
        trips: updateTripsList
      };
    }

    case TripActionType.TRIPDATEEND: {
      const updateTripsList = state.trips.map((trip, index) => {
        if (trip._id === action.data.id) {
          return {
            ...trip,
            dateEnd: action.data.dateEnd
          };
        }
        return trip;
      });
      return {
        ...state,
        trips: updateTripsList
      };
    }

    default:
      return state;
  }
}