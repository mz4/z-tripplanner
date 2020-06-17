import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
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
interface IPropsInput {
  name: string,
  placeholder: string,
}

const MyTextInput: React.FC<IPropsInput> = (props) => {
  const [field, meta] = useField(props);
  return (
    <>
      <input 
        className="text-input"
        autoComplete="off" 
        {...field} 
        {...props} 
      />
      {meta.touched && meta.error ? (
        <div className="error">
          {meta.error}
        </div>
      ) : null}
    </>
  );
};


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
            dateEnd
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
            setTimeout(() => {
              addTrip({ variables: { 
                name: values.name,
                dateStart: values.dateStart,
                dateEnd: values.dateEnd 
              } });
              resetForm({})
              setSubmitting(false);
            }, 400);
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
                    <MyTextInput
                      name="dateStart"
                      placeholder="Date Start"
                    />
                  </div>
                  <div className="col-md-2">
                    <MyTextInput
                      name="dateEnd"
                      placeholder="Date End"
                    />
                  </div>

                  <div className="col-md-2">
                    <button type="submit">Submit</button>
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
