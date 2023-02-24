import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import { Formik, Form, useField } from 'formik'
import { DatePickerField, MyTextInput } from "../Fields/Fields"
import { Button } from '../Elements/button/Button'
import "react-datepicker/dist/react-datepicker.css"
import { API, graphqlOperation } from 'aws-amplify'
import { createTrip } from '../../graphql/mutations'
import * as Yup from 'yup'
import moment from 'moment'
import gql from 'graphql-tag'
import i18n from '../../utils/i18ns'
import { Activity_main } from './ActivityForm.style'

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
  tripId: string,
}

const ActivityForm: React.FC<IProps> = (props) => {

  const handleSubmit = async (vars) => {
    const { name, dateStart, dateEnd, isConfirmed, isEditing } = vars.variables
    const input = {
      name: name,
      dateStart: dateStart,
      dateEnd: dateEnd,
      isConfirmed: isConfirmed,
      isEditing: isEditing
    }
    try {
      await API.graphql(graphqlOperation(createTrip, {input}))
    } catch(e) {
      console.log('error', e)
    }
  }

  const { tripId } = props;
  const isConfirmed = false;
  const isEditing = false;
  return (
    <Formik
      initialValues={{
        name: "",
        dateStart: "",
        dateEnd: ""
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(15, i18n.t('Max15'))
          .required(i18n.t('Required')),
        dateStart: Yup.string()
          .required(i18n.t('Required')),
        dateEnd: Yup.string()
          .required(i18n.t('Required')),
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        handleSubmit({ variables: { 
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
          <Activity_main>
            <div>
              <MyTextInput
                name="name"
                placeholder={i18n.t('Name')}
              />
            </div>
            <div>
              <DatePickerField
                name="dateStart"
                placeholderText={i18n.t('DateStart')}
              />                  
            </div>
            <div>
              <DatePickerField
                name="dateEnd"
                placeholderText={i18n.t('DateEnd')}
              />
            </div>
            <div className="action">
              <Button 
                appearance = "primary" 
                type = "submit" 
                name = "submit" 
                value = "submit"
                isLoading = {false}
                loadingText = {null}
                isLink = {false}
                isDisabled = {false}
                isUnclickable = {false}
                containsIcon = {false}
                size = 'medium'
                onClick = {undefined}
              >
                {i18n.t('Save')}
              </Button>
            </div>
          </Activity_main>
        </Form>
      </Formik>
  )
}

ActivityForm.propTypes = {
  tripId: PropTypes.string.isRequired
};

export default ActivityForm
