import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo';
import { Formik, Form, useField } from 'formik';
import { DatePickerField, MyTextInput } from "./DatePicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from 'yup';
import moment from 'moment';
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

interface IProps {
  name: string,
  dateStart: string,
  dateEnd: string,
}

const TripForm: React.FC<IProps> = (props) => {
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
          <Formik
          initialValues={{
            name: "",
            dateStart: "",
            dateEnd: ""
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .max(15, "Must be 15 characters max")
              .required("Required"),
            dateStart: Yup.string()
              .required("Required"),
            dateEnd: Yup.string()
              .required("Required"),
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            addTrip({ variables: { 
              name: values.name,
              dateStart: moment(values.dateStart).format('YYYY/MM/DD'),
              dateEnd: moment(values.dateEnd).format('YYYY/MM/DD'),
              isConfirmed: false,
              isEditing: false
            } });
            resetForm({})
            setSubmitting(false);
          }}
          >
            <Form 
              translate=""
              >
              <div className="destination">
                <div className="row">
                  <div className="col-md-4">
                    <MyTextInput
                      name="name"
                      placeholder="Name"
                    />
                  </div>
                  <div className="col-md-2">
                    <DatePickerField
                      name="dateStart"
                      placeholderText="Date Start"
                    />                  </div>
                  <div className="col-md-2">
                    <DatePickerField
                      name="dateEnd"
                      placeholderText="Date End"
                    />
                  </div>
                  <div className="col-md-2">
                    <button 
                      type="submit"
                      className="primary"  
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          </Formik>
        )}
      </Mutation>
    </>
  )
}

TripForm.propTypes = {
  name: PropTypes.string.isRequired,
  dateStart: PropTypes.string.isRequired,
  dateEnd: PropTypes.string.isRequired,
};

export default TripForm
