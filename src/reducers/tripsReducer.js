import * as TripActionType from '../constants/actionTypes';
import objectAssign from 'object-assign';

// import * as PlayerActionTypes from '../actiontypes/player';
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

    // case PlayerActionTypes.REMOVE_PLAYER: {
    //   const removePlayerList = [
    //     ...state.players.slice(0, action.index),
    //     ...state.players.slice(action.index + 1)
    //   ];
    //   return {
    //     ...state,
    //     players: removePlayerList
    //   };
    // }

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

    // case PlayerActionTypes.SELECT_PLAYER:
    //   return {
    //     ...state,
    //     selectedPlayerIndex: action.index
    //   };

    default:
      return state;
  }
}