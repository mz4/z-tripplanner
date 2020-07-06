import React from "react";
import { API, graphqlOperation } from 'aws-amplify'
import { updateTrip } from '../../graphql/mutations'
import i18n from '../../utils/i18ns'

const TripConfirm = props => {

  const handleToggle = async (id, isConfirmed ) => {
    const input = {
      id: id,
      isConfirmed: isConfirmed
    }
    await API.graphql(graphqlOperation(updateTrip, { input }))
  }

  const { id, isConfirmed } = props;
  console.log(isConfirmed)
  return (
    <div className="checkboxes">
      <label>
        <input
          type="checkbox"
          checked={isConfirmed}
          onChange={() => handleToggle(id, !isConfirmed )} />
        <span className="confirmed">
          {i18n.t('ConfirmedOne')}
        </span>
      </label>
    </div>
  );
};

export default TripConfirm;