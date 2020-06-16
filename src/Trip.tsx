import React from 'react';
import PropTypes from 'prop-types';
import TripName from './TripName';
import TripDate from './TripDate';
import TripDelete from './components/TripDelete';
import TripConfirm from './components/TripConfirm';

const Trip = props =>
  <div key={props.keyid} className="row">
    <div className="col-md-10">
      <div className="trip">
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
      </div>
    </div>
  </div>;

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
