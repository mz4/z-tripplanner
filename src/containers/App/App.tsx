import axios from 'axios'
import React, { useState } from 'react'
import {
  Query
} from 'react-apollo'
import { hot } from 'react-hot-loader'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import Cookies from 'universal-cookie'
import { withTranslation } from 'react-i18next'
import i18n from '../../utils/i18ns'
import { Button } from '../../components/Elements/button/Button'
import {
  setTripDateEndDispatcher,
  setTripDateStartDispatcher,
  setTripNameDispatcher,
  tripsListDispatcher
} from '../../actions/tripsActions'
import { logoutAuth } from '../../actions/authActions'
import getAPIUrl from '../../constants/serverAPI'
import Counter from '../../components/Counter/Counter'
import TripList from '../../components/Trips/TripList'
import TripForm from '../../components/Trip/TripForm'
import { Loader } from '../../components/Elements/Loader/Loader'
import { GET_TRIPS, NEW_TRIPS_SUBSCRIPTION, DELETE_TRIP_SUBSCRIPTION, TOGGLE_TRIP_SUBSCRIPTION } from '../../queries/Queries'

import '../../css/main.scss';

const cookies = new Cookies();

export interface Trips {
  id: string,
  key: string,
  name: string,
  dateStart: string,
  dateEnd: string,
  isConfirmed: boolean,
  isEditing: boolean,
}

interface Data {
  trips: Trips[];
}

interface MyProps {
  token: '',
  trips: [
    {
      id: string,
      key: string,
      name: string,
      dateStart: string,
      dateEnd: string,
      isConfirmed: boolean,
      isEditing: boolean,
    }
  ],
  t: (ReactNode) => string,
  i18n?: any;
  tripsListLoad: (token) => void,
  setTripName: (trip) => void,
  setDateStart: (trip) => void,
  setDateEnd: (trip) => void,
  logoutAuth: (isAuthenticated: boolean, token: string, authErrorMsg: string) => void,
};

interface MyState {
  filter: {
    confirmed: string,
  },
  form: {
    name: string,
    dateStart: string,
    dateEnd: string
  },
  count: number,
  trip: {
    id: string,
    key: string,
    name: string,
    dateStart: string,
    dateEnd: string,
    isConfirmed: boolean,
    isEditing: boolean,
  },
  language: string
};

const App: React.FC<MyProps> = (props) => {
  const [ values, setValues ] = useState(
  {
    filter: {
      confirmed: ''
    },
    form: {
      name: "",
      dateStart: "",
      dateEnd: ""
    },
    count: 0,
    trip: {
      id: "",
      key: "",
      name: "",
      dateStart: "",
      dateEnd: "",
      isConfirmed: false,
      isEditing: false,
    },
    language: 'en'
  });

  const Logout = () => {
    cookies.remove('token')
    cookies.remove('auth')
    props.logoutAuth(false, '', '');
  }

  const setLanguage = (language: string) => {
    console.log(language);
    setValues({
      ...values,
      language: language
    });
    console.log("state value is", language);
    props.i18n.changeLanguage(language);
    // cookies.remove('token')
    // props.logoutAuth(false, '', '');
  }

  const setConfirmed = (status) => {
    console.log('........................');
    console.log(status);
    setValues({
      ...values,
      filter: {
        ...values.filter,
        confirmed: status
      }
    })
    // setState({
    //   filter: {
    //     ....values.filter,
    //     confirmed: status,
    //   }
    // });
  }

  const handleChange = e => {
    setValues({
      ...values,
      form: {
        ...values.form,
        [e.target.name]: e.target.value
      }
    })
    // setValues({
    //   form: {
    //     ...values.form,
    //     [e.target.name]: e.target.value
    //   }
    // })
  }


  const getTotalTrips = (trips) => trips.length;

  const getConfirmedTrips = (trips) =>
    trips.reduce(
      (total, trip) => trip.isConfirmed ? total + 1 : total,
      0
    );

  const _subscribeToNewTrips = subscribeToMore => {
    subscribeToMore({
      document: NEW_TRIPS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const newTrip = subscriptionData.data.newTrip

        const exists = prev.trips.find(trip => trip.id === newTrip.id);
        if (exists) return prev;

        return Object.assign({}, prev, {
          trips: [newTrip, ...prev.trips],
        })
      }
    })
  }

  const _subscribeToDeletedTrips = subscribeToMore => {
    subscribeToMore({
      document: DELETE_TRIP_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const deleteTrip = subscriptionData.data.deleteTrip
        const prevtrips = prev.trips;
        const newtrips = prevtrips.filter(function( obj ) {
          return obj.id !== deleteTrip.id
        })
        const alltrips = {
          trips: newtrips
        };
        return alltrips;
      }
    })
  }

  const _subscribeToToggledTrips = subscribeToMore => {
    subscribeToMore({
      document: TOGGLE_TRIP_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const toggleTrip = subscriptionData.data
        const prevtrips = prev.trips;
        return
      }
    })
  }

  const { t, i18n } = props
  const { name, dateStart, dateEnd } = values.form
  const { language } = values
  return (
    <React.Fragment>
      <Query<Data> query={GET_TRIPS}>
        {({ loading, error, data, subscribeToMore }) => {

          if (loading) return <Loader size='100' color = '#34d100' sizeUnit = 'px' />

          if (error) return <div>Error</div>

          _subscribeToNewTrips(subscribeToMore)
          _subscribeToDeletedTrips(subscribeToMore)
          _subscribeToToggledTrips(subscribeToMore)

          const trips = data?.trips || [];
          const totalTrips = getTotalTrips(trips);
          const numberConfirmed = getConfirmedTrips(trips);
          const numberUnconfirmed = totalTrips - numberConfirmed;
          // const setConfirmed = () => setConfirmed(status);

          return (
            <React.Fragment>

              <header className="header">
                <ul className="header__menu">
                  <li>
                    <div className="header__logo">
                      <h2>Trip <span>{i18n.t('Title', { language })}</span> </h2>
                    </div>
                  </li>
                  <li className="header__right">
                    <div className="header__settings">
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
                        onClick = {() => setLanguage('it')}
                      >
                        IT
                      </Button>
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
                        size = 'medium'
                        onClick = {() => setLanguage('en')}
                      >
                        EN
                      </Button>
                      <Button 
                        appearance = "tertiary" 
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
                        onClick = {Logout}
                      >
                        {i18n.t('Logout')}
                      </Button>
                    </div>
                    </div>
                  </li>
                </ul>
              </header>

              <div className="App">
                <div className="main">

                  <TripForm
                    name={name}
                    dateStart={dateStart}
                    dateEnd={dateEnd}
                  />

                  <Counter
                    totalTrips={totalTrips}
                    numberConfirmed={numberConfirmed}
                    numberUnconfirmed={numberUnconfirmed}
                    setConfirmed={(status) => setConfirmed(status)}
                    confirmed={values.filter.confirmed}
                  />

                  <TripList
                    trips={trips}
                    name={values.form.name}
                    confirmed={values.filter.confirmed}
                  />

                </div>
              </div>
            </React.Fragment>
          );

        }}
      </Query>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth.isAuthenticated,
  }
}

const mapDispatchToProps = dispatch => ({
  tripsListLoad: (token) => dispatch(tripsListDispatcher(token)),
  setTripName: (trip) => dispatch(setTripNameDispatcher(trip)),
  setDateStart: (trip) => dispatch(setTripDateStartDispatcher(trip)),
  setDateEnd: (trip) => dispatch(setTripDateEndDispatcher(trip)),
  logoutAuth: (
    isAuthenticated, 
    token, 
    authErrorMsg) => 
      dispatch(
        logoutAuth(
          isAuthenticated, 
          token, 
          authErrorMsg)),
});

export default compose(
  hot(module),
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps)
)(App)