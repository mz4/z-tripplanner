import React from 'react';
import PropTypes from 'prop-types';
import TripName from './TripName';
import TripDate from './TripDate';
import TripDelete from './TripDelete';
import TripConfirm from './TripConfirm';
import { Link } from "react-router-dom";

import { Trip_main, Col_md_10 } from './Trip.style'

const Trip = props => {

  const handleView = (Id) => {
    console.log(Id)
  }
  return (
    <div key={props.keyid} className="row">
      <Col_md_10>
        <Trip_main
          onClick = {() => handleView(props.id)}
        >
          <div>
            <TripName
              isEditing={props.isEditing}
              handleNameEdits={e => props.setName(e.target.value, props.id)}
              >
              {props.name}
            </TripName>
          </div>
          <div>
            <TripDate
              isEditing={props.isEditing}
              handleDateEdits={e => props.setDateStart(e.target.value, props.id)}>
              {props.dateStart}
            </TripDate>
          </div>
          <div>
            <TripDate
              isEditing={props.isEditing}
              handleDateEdits={e => props.setDateEnd(e.target.value, props.id)}>
              {props.dateEnd}
            </TripDate>
          </div>
          <TripConfirm
            id={props.id}
            isConfirmed={props.isConfirmed}
          />
          <TripDelete 
            id={props.id}
          />
        </Trip_main>
      </Col_md_10>
    </div>
  )
}



Trip.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  dateStart: PropTypes.string.isRequired,
  dateEnd: PropTypes.string.isRequired,
  isConfirmed: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  key: PropTypes.any,
  keyid: PropTypes.any,
};

export default Trip;
