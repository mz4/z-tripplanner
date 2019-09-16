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
      return state;
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

    // case PlayerActionTypes.UPDATE_PLAYER_SCORE: {
    //   const updatePlayerList = state.players.map((player, index) => {
    //     if (index === action.index) {
    //       return {
    //         ...player,
    //         score: player.score + action.score,
    //         updated: `${month}/${day}/${year}`
    //       };
    //     }
    //     return player;
    //   });
    //   return {
    //     ...state,
    //     players: updatePlayerList
    //   };
    // }

    // case PlayerActionTypes.SELECT_PLAYER:
    //   return {
    //     ...state,
    //     selectedPlayerIndex: action.index
    //   };

    default:
      return state;
  }
}
