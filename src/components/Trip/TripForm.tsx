import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

// Add Trip
const POST_TRIP = gql`
  mutation addTrip(
      $name: String!, 
      $dateStart: String!, 
      $dateEnd: String!,
      $isConfirmed: Boolean, 
      $isEditing: Boolean
    ) {
    addTrip(
        name: $name, 
        dateStart: $dateStart, 
        dateEnd: $dateEnd, 
        isConfirmed: $isConfirmed, 
        isEditing: $isEditing
      ) {
        name
        dateStart
        dateEnd
        isConfirmed
        isEditing
    }
  }
`

const TripForm = (props) => {
  const { name, dateStart, dateEnd } = props;
  const isConfirmed = false;
  const isEditing = false;
  return (
    <>
      <Mutation
        mutation={POST_TRIP}
        variables={{
          name,
          dateStart,
          dateEnd,
          isConfirmed,
          isEditing
        }}
      >
        {addTrip => (
          <form onSubmit={e => {
            e.preventDefault();
            addTrip();
          }}
          >
            <div className="destination">
              <div className="row">
                <div className="col-md-4">
                  <input
                    type="text"
                    name="name"
                    value={name}
                    placeholder="Name"
                    onChange={props.handleChange}
                  />
                </div>
                <div className="col-md-2">
                  <input
                    type="text"
                    name="dateStart"
                    value={dateStart}
                    placeholder="Date Start"
                    onChange={props.handleChange}
                  />
                </div>
                <div className="col-md-2">
                  <input
                    type="text"
                    name="dateEnd"
                    value={dateEnd}
                    placeholder="Date End"
                    onChange={props.handleChange}
                  />
                </div>
                <div className="col-md-2">
                  <button type="submit">Submit</button>
                </div>
              </div>
            </div>
          </form>
        )}
      </Mutation>
    </>
  )
}

TripForm.propTypes = {
  name: PropTypes.string.isRequired,
  dateStart: PropTypes.string.isRequired,
  dateEnd: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default TripForm
