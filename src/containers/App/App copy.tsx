import React, { useState, useEffect } from 'react'
import {
  Query
} from 'react-apollo'
import { hot } from 'react-hot-loader'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import Cookies from 'universal-cookie'
import { withTranslation } from 'react-i18next'
import { useTheme } from "../../context/ThemeContext";
import {
  setTripDateEndDispatcher,
  setTripDateStartDispatcher,
  setTripNameDispatcher,
  tripsListDispatcher
} from '../../actions/tripsActions'
import { logoutAuth } from '../../actions/authActions'
import Header from '../../components/Header/Header'
import Counter from '../../components/Counter/Counter'
import TripList from '../../components/Trips/TripList'
import TripForm from '../../components/Trip/TripForm'
import { Loader } from '../../components/Elements/Loader/Loader'
import { App_main, App_inner } from './App.style'
import { GET_TRIPS, NEW_TRIPS_SUBSCRIPTION, DELETE_TRIP_SUBSCRIPTION, TOGGLE_TRIP_SUBSCRIPTION } from '../../queries/Queries'

import { listTrips } from '../../graphql/queries'
import { API, graphqlOperation } from 'aws-amplify'

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

const App: React.FC<MyProps> = (props) => {
  const themeToggle = useTheme();
  const [data, setData] = useState({ hits: [] });
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

  useEffect(() => {
    const getData = async () => {
      const result = await API.graphql(graphqlOperation(listTrips))
      setData(result.data.listTrips.items)
      console.log(JSON.stringify(result.data.listTrips.items))
    }
    getData()
  }, [])

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
  }

  const setConfirmed = (status) => {
    setValues({
      ...values,
      filter: {
        ...values.filter,
        confirmed: status
      }
    })
  }

  const getTotalTrips = (trips) => trips.length;

  const getConfirmedTrips = (trips) =>
    trips.reduce(
      (total, trip) => trip.isConfirmed ? total + 1 : total,
      0
    );

  const { name, dateStart, dateEnd } = values.form
  return (
    <React.Fragment>
      {/* <Query<Data> query={GET_TRIPS}>
        {({ loading, error, data, subscribeToMore }) => {

          if (loading) return <Loader size='100' color = '#34d100' sizeUnit = 'px' />

          if (error) return <div>Error</div>

          const trips = data?.trips || [];
          const totalTrips = getTotalTrips(trips);
          const numberConfirmed = getConfirmedTrips(trips);
          const numberUnconfirmed = totalTrips - numberConfirmed;

          return (
            <React.Fragment>

              <Header
                setLanguage = {(language) => setLanguage(language)}
                themeToggle={() => themeToggle.toggle()}
                Logout={Logout}
              />


              <App_main>
                <App_inner>

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

                </App_inner>
              </App_main>
            </React.Fragment>
          );

        }}
      </Query> */}
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