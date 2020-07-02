import React from 'react'
import PropTypes from 'prop-types'
import i18n from '../../utils/i18ns'
import { 
  Counter_main, Counter_type, 
  Counter_type_selected, Counter_type_title, 
  Counter_type_value } from './Counter.style'

const Counter = (props) => {
  const { setConfirmed, confirmed } = props;
  return (
    <Counter_main>

      <div className={"counter__type " + ((confirmed=='') ? "counter__type--selected" : "")} onClick={() => setConfirmed('')}>
        <div className="counter__type__title">
          {i18n.t('All')}
        </div>
        <div className="counter__type__value">
          {props.totalTrips}
        </div>
      </div>

      <div className={"counter__type " + (confirmed === 'confirmed' ? "counter__type--selected" : "")} onClick={() => setConfirmed('confirmed')}>
        <div className="counter__type__title">
          {i18n.t('Confirmed')}
        </div>
        <div className="counter__type__value">
          {props.numberConfirmed}
        </div>
      </div>

      <div className={"counter__type " + ((confirmed === 'unconfirmed') ? "counter__type--selected" : "")} onClick={() => setConfirmed('unconfirmed')}>
        <div className="counter__type__title">
          {i18n.t('Unconfirmed')}
        </div>
        <div className="counter__type__value">
          {props.numberUnconfirmed}
        </div>
      </div>

    </Counter_main>
  )
}

Counter.propTypes = {
  numberConfirmed: PropTypes.number,
  numberUnconfirmed: PropTypes.number,
  totalTrips: PropTypes.number,
  setConfirmed: PropTypes.func.isRequired,
  confirmed: PropTypes.string.isRequired,
};

export default Counter;
