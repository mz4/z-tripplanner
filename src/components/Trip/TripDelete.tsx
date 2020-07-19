import { Button } from '../Elements/button/Button'
import React from "react"
import { API, graphqlOperation } from 'aws-amplify'
import { deleteTrip } from '../../graphql/mutations'
import i18n from '../../utils/i18ns'

const TripDelete = props => {

  const handleDelete = async (e, Id) => {
    e.stopPropagation()
    const input = {
      id: Id
    }
    await API.graphql(graphqlOperation(deleteTrip, { input }))
  }

  const { id } = props;
  return (
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
        onClick = {(e) => handleDelete(e, id)}
      >
        {i18n.t('Removed')}
      </Button>
    </div>
  );
};

export default TripDelete;