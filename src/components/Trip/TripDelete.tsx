import { Mutation } from "react-apollo"
import { Button } from '../Elements/button/Button'
import React from "react"
import gql from 'graphql-tag'
import i18n from '../../utils/i18ns'

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
        <div className="action">
          <Button 
            appearance = "secondary" 
            type = "submit" 
            name = "submit" 
            value = "submit"
            isLoading = {false}
            loadingText = {null}
            isLink = {false}
            isDisabled = {false}
            isUnclickable = {false}
            containsIcon = {false}
            size = ''
            onClick = {deleteTrip}
          >
            {i18n.t('Removed')}
          </Button>
        </div>
      )}
    </Mutation>
  );
};

export default TripDelete;