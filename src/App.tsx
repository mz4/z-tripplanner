import axios from 'axios';
import React from 'react';
import {
  Query
} from 'react-apollo';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import {
  setTripDateEndDispatcher,
  setTripDateStartDispatcher,
  setTripNameDispatcher,
  tripsListDispatcher
} from '../src/actions/tripsActions';
import getAPIUrl from './constants/serverAPI';
import Counter from './Counter';
import TripList from './TripList';
import TripForm from './components/Trip/TripForm';
import { GET_TRIPS, NEW_TRIPS_SUBSCRIPTION, DELETE_TRIP_SUBSCRIPTION, TOGGLE_TRIP_SUBSCRIPTION } from './queries/Queries';

import './css/main.scss';

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
  tripsListLoad: (token) => void,
  setTripName: (trip) => void,
  setDateStart: (trip) => void,
  setDateEnd: (trip) => void,
};

interface MyState {
  filter: {
    showConfirmed: boolean,
    showUnConfirmed: boolean,
    showAll: boolean
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
  }
};

class App extends React.Component<MyProps, MyState> {
  constructor(props) {
    super(props);
    this.state = {
      filter: {
        showConfirmed: false,
        showUnConfirmed: false,
        showAll: true
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
      }
    };
    this.getTotalTrips = this.getTotalTrips.bind(this);
  }

  setConfirmed() {
    this.setState({
      filter: {
        showConfirmed: true,
        showUnConfirmed: false,
        showAll: false,
      }
    });
  }

  setUnConfirmed() {
    this.setState({
      filter: {
        showConfirmed: false,
        showUnConfirmed: true,
        showAll: false,
      }
    });
  }

  setAll() {
    this.setState({
      filter: {
        showConfirmed: true,
        showUnConfirmed: true,
        showAll: true,
      }
    })
  }

  handleChange = e =>
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    })

  private getTotalTrips = (trips) => trips.length;

  getConfirmedTrips = (trips) =>
    trips.reduce(
      (total, trip) => trip.isConfirmed ? total + 1 : total,
      0
    );

  _subscribeToNewTrips = subscribeToMore => {
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

  _subscribeToDeletedTrips = subscribeToMore => {
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

  _subscribeToToggledTrips = subscribeToMore => {
    subscribeToMore({
      document: TOGGLE_TRIP_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const toggleTrip = subscriptionData.data
        const prevtrips = prev.trips;
        console.log(toggleTrip)
        return
      }
    })
  }

  render() {
    const { name, dateStart, dateEnd } = this.state.form
    return (
      <React.Fragment>
        <Query<Data> query={GET_TRIPS}>
          {({ loading, error, data, subscribeToMore }) => {

            if (loading) return <div>Fetching...</div>

            if (error) return <div>Error</div>

            this._subscribeToNewTrips(subscribeToMore)
            this._subscribeToDeletedTrips(subscribeToMore)
            this._subscribeToToggledTrips(subscribeToMore)

            const trips = data?.trips || [];
            const totalTrips = this.getTotalTrips(trips);
            const numberConfirmed = this.getConfirmedTrips(trips);
            const numberUnconfirmed = totalTrips - numberConfirmed;
            const setConfirmed = () => this.setConfirmed();
            const setUnConfirmed = () => this.setUnConfirmed();
            const setAll = () => this.setAll();

            return (
              <React.Fragment>
                <div className="App">
                  <div className="main">

                    <header className="header">
                      <div className="header__logo">
                        <h2>Trip Planner!</h2>
                      </div>
                    </header>

                    <TripForm
                      name={name}
                      dateStart={dateStart}
                      dateEnd={dateEnd}
                      handleChange={this.handleChange}
                    />

                    <Counter
                      totalTrips={totalTrips}
                      numberConfirmed={numberConfirmed}
                      numberUnconfirmed={numberUnconfirmed}
                      setConfirmed={setConfirmed}
                      setUnConfirmed={setUnConfirmed}
                      setAll={setAll}
                      showConfirmed={this.state.filter.showConfirmed}
                      showUnConfirmed={this.state.filter.showUnConfirmed}
                      showAll={this.state.filter.showAll}
                    />

                    <TripList
                      trips={trips}
                      name={this.state.form.name}
                      showConfirmed={this.state.filter.showConfirmed}
                      showUnConfirmed={this.state.filter.showUnConfirmed}
                      showAll={this.state.filter.showAll}
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
  setDateEnd: (trip) => dispatch(setTripDateEndDispatcher(trip))
});

export default hot(module)(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
