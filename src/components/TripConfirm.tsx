import { Mutation } from "react-apollo";
import React from "react";
import gql from 'graphql-tag';

// Toggle Trip
const TOGGLE_TRIP = gql`
  mutation toggleTrip($id: String!, $isConfirmed: Boolean!) {
    toggleTrip(id: $id, isConfirmed: $isConfirmed) {
      id
    }
  }
`

const TripConfirm = props => {
  const { id, isConfirmed } = props;
  return (
    <Mutation
      mutation={TOGGLE_TRIP}
      variables={{
        id
      }}
    >
      {toggleTrip => (
        <div className="checkboxes">
          <label>
            <input
              type="checkbox"
              checked={isConfirmed}
              onChange={() => toggleTrip({ variables: {id: id, isConfirmed: !isConfirmed }})} />
            <span className="confirmed">Confirmed</span>
          </label>
        </div>
      )}
    </Mutation>
  );
};

export default TripConfirm;