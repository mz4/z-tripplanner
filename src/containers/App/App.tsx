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
} from '../../actions/tripsActions';
import getAPIUrl from '../../constants/serverAPI';
import Counter from '../../components/Counter/Counter';
import TripList from '../../components/Counter/TripList';
import TripForm from '../../components/Trip/TripForm';
import { Loader } from '../../components/Elements/Loader/Loader';
import { GET_TRIPS, NEW_TRIPS_SUBSCRIPTION, DELETE_TRIP_SUBSCRIPTION, TOGGLE_TRIP_SUBSCRIPTION } from '../../queries/Queries';

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
  }
};

class App extends React.Component<MyProps, MyState> {
  constructor(props) {
    super(props);
    this.state = {
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
      }
    };
    this.getTotalTrips = this.getTotalTrips.bind(this);
    this.setConfirmed = this.setConfirmed.bind(this);
  }

  setConfirmed(status) {
    this.setState({
      filter: {
        ...this.state.filter,
        confirmed: status,
      }
    });
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

            if (loading) return <Loader size='100' color = '#34d100' sizeUnit = 'px' />

            if (error) return <div>Error</div>

            this._subscribeToNewTrips(subscribeToMore)
            this._subscribeToDeletedTrips(subscribeToMore)
            this._subscribeToToggledTrips(subscribeToMore)

            const trips = data?.trips || [];
            const totalTrips = this.getTotalTrips(trips);
            const numberConfirmed = this.getConfirmedTrips(trips);
            const numberUnconfirmed = totalTrips - numberConfirmed;
            const setConfirmed = () => this.setConfirmed(status);

            return (
              <React.Fragment>
                <header className="header">
                  <div className="header__logo">
                    <h2>Trip Planner!</h2>
                  </div>
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
                      setConfirmed={this.setConfirmed}
                      confirmed={this.state.filter.confirmed}
                    />

                    <TripList
                      trips={trips}
                      name={this.state.form.name}
                      confirmed={this.state.filter.confirmed}
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
