import { Mutation } from "react-apollo";
import React from "react";
import gql from 'graphql-tag';

// Delete Trip
const DELETE_TRIP = gql`
  mutation deleteTrip($id: String!) {
    deleteTrip(id: $id) {
      id
    }
  }
`

const TripDelete = props => {
  const { id } = props;
  return (
    <Mutation
      mutation={DELETE_TRIP}
      variables={{
        id
      }}
    >
      {deleteTrip => (
        <button
          className="delete"
          onClick={deleteTrip}
        >
          Remove
        </button>
      )}
    </Mutation>
  );
};

export default TripDelete;