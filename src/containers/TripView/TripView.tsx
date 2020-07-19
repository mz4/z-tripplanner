import React from 'react';
import PropTypes from 'prop-types';
import TripName from '../../components/Trip/TripName';

import { Trip_main, Col_md_10 } from '../../components/Trip/Trip.style'

const Trip = props =>
  <div key={props.keyid} className="row">
    <Col_md_10>
      <Trip_main>
        <div>
          <TripName
            isEditing={props.isEditing}
            handleNameEdits={e => props.setName(e.target.value, props.id)}
            >
            {props.name}
          </TripName>
        </div>
      </Trip_main>
    </Col_md_10>
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