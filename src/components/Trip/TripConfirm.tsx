import { Mutation } from "react-apollo";
import React from "react";
import gql from 'graphql-tag';
import i18n from '../../utils/i18ns'

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
            <span className="confirmed">
              {i18n.t('ConfirmedOne')}
            </span>
          </label>
        </div>
      )}
    </Mutation>
  );
};

export default TripConfirm;