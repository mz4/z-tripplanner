import React, { useState, useEffect } from 'react'
import { hot } from 'react-hot-loader'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import Cookies from 'universal-cookie'
import { withTranslation } from 'react-i18next'
import { Observable } from 'zen-observable-ts';
import {
  setTripDateEndDispatcher,
  setTripDateStartDispatcher,
  setTripNameDispatcher,
  tripsListDispatcher
} from '../../actions/tripsActions'
import { logoutAuth } from '../../actions/authActions'
import Counter from '../../components/Counter/Counter'
import TripList from '../../components/Trips/TripList'
import TripForm from '../../components/Trip/TripForm'
import { Loader } from '../../components/Elements/Loader/Loader'
import { App_main, App_inner } from './App.style'
import { listTrips } from '../../graphql/queries'
import { 
  onCreateTrip, 
  onUpdateTrip,
  onDeleteTrip
} from '../../graphql/subscriptions'
import { API, graphqlOperation } from 'aws-amplify'

import '../../css/main.scss';

export interface Trips {
  id: string,
  key: string,
  name: string,
  dateStart: string,
  dateEnd: string,
  isConfirmed: boolean,
  isEditing: boolean,
}

export interface Trip {
  id: string,
  key: string,
  name: string,
  dateStart: string,
  dateEnd: string,
  isConfirmed: boolean,
  isEditing: boolean
}

interface Data {
  trips: Trips[];
}

interface tripData {
  value: {
    data: {
      onCreateTrip: Trip
    }
  }
}

interface tripDataUpdate {
  value: {
    data: {
      onUpdateTrip: Trip
    }
  }
}

interface tripDataDelete {
  value: {
    data: {
      onDeleteTrip: Trip
    }
  }
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
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [values, setValues] = useState(
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

  const getData = async () => {
    const result: any = await API.graphql(graphqlOperation(listTrips))
    setData(result.data.listTrips.items)
    setIsLoaded(true)
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {

    const onCreate = (API.graphql(graphqlOperation(onCreateTrip)) as Observable<object>)
    .subscribe({
      next: (tripData: tripData) => {
        const newTrip = tripData.value.data.onCreateTrip
        const prevTrips = data.filter( (trip: Trips) => trip.id !== newTrip.id)
        const updatedTrips: any = [newTrip, ...prevTrips]
        setData(updatedTrips)
      }
    })

    const onUpdateSubscription = (API.graphql(graphqlOperation(onUpdateTrip)) as Observable<object>)
    .subscribe({
      next: (tripData: tripDataUpdate) => {
        const updatedTrip: any = tripData.value.data.onUpdateTrip
        const updatedTrips: any = data.map((d: any) => d.id === updatedTrip.id ? updatedTrip : d)
        setData(updatedTrips)
      }
    })

    const onDeleteSubscription = (API.graphql(graphqlOperation(onDeleteTrip)) as Observable<object>)
    .subscribe({
      next: (tripData: tripDataDelete) => {
        const updatedTrip: any = tripData.value.data.onDeleteTrip
        const updatedTrips: any = data.filter((d: any) => d.id != updatedTrip.id)
        setData(updatedTrips)
      }
    })

    return () => {
      onUpdateSubscription.unsubscribe()
      onCreate.unsubscribe()
      onDeleteSubscription.unsubscribe()
    };

  })

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
  const totalTrips = getTotalTrips(data)
  const numberConfirmed = getConfirmedTrips(data)
  const numberUnconfirmed = totalTrips - numberConfirmed
  return (
    <React.Fragment>
      <App_main>
        <App_inner>
          {isLoaded === false ? 
          <Loader 
            size='100' 
            color = '#34d100' 
            sizeUnit = 'px' 
          /> :
          <> 
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
              trips={data}
              name={values.form.name}
              confirmed={values.filter.confirmed}
            />
          </>
        }
        </App_inner>
      </App_main>
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