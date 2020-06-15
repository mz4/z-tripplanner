import axios from 'axios';
import gql from 'graphql-tag';
import React from 'react';
import {
  Query
} from 'react-apollo';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import {
  setTripDateEndDispatcher,
  setTripDateStartDispatcher,
  setTripNameDispatcher
} from '../src/actions/tripsActions';
import getAPIUrl from './constants/serverAPI';
import Counter from './Counter';
import TripList from './TripList';
import TripForm from './components/Trip/TripForm';

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
  setTripName: (trip) => void,
  setDateStart: (trip) => void,
  setDateEnd: (trip) => void,
};

interface MyTrip {
  id: string,
  key: string,
  name: string,
  dateStart: string,
  dateEnd: string,
  isConfirmed: boolean,
  isEditing: boolean,
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

// Get Trips
const GET_TRIPS = gql`
  {
    trips {
      id
      name
      dateStart
      dateEnd
      isConfirmed
      isEditing
    }
  }
`
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

// Trip subscriptions
const NEW_TRIPS_SUBSCRIPTION = gql`
  subscription TripAdded {
    newTrip {
      id
      name
      dateStart
      dateEnd
      isConfirmed
      isEditing
    }
  }
`

const DELETE_TRIP_SUBSCRIPTION = gql`
  subscription deleteTrip {
    deleteTrip {
      id
      name
      dateStart
      dateEnd
      isConfirmed
      isEditing
    }
  }
`;

const TOGGLE_TRIP_SUBSCRIPTION = gql`
  subscription toggleTrip {
    toggleTrip {
      id
      name
      dateStart
      dateEnd
      isConfirmed
      isEditing
    }
  }
`;

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

  saveEditingAt = (trip) => {
    const isEditingToggled = false;
    const { name, dateStart, dateEnd, _id: id } = trip;
    const { token } = this.props;
    const host = getAPIUrl();
    const url = 'api/trip/' + id;
    axios
      .put(
        host + url,
        {
          name: name,
          dateStart: dateStart,
          dateEnd: dateEnd,
          isEditing: isEditingToggled
        },
        {
          headers:
          {
            "Authorization": `Bearer ${token}`
          }
        })
      .catch(error => {
        throw error;
      });
  }

  toggleEditingAt = (id: String, isEditing: Boolean) => {
    console.log('toggle editing')
    const isEditingToggled = !isEditing;
    const { token } = this.props;
    const host = getAPIUrl();
    const url = 'api/trip/' + id;
    axios
      .put(
        host + url,
        {
          isEditing: isEditingToggled
        },
        {
          headers:
          {
            "Authorization": `Bearer ${token}`
          }
        })
      .catch(error => {
        throw error;
      });
  }

  setNameAt = (name: string, id: string) => {
    const trip = {
      id: id,
      name: name
    };
    this.props.setTripName(trip);
  }

  setDateStartAt = (dateStart, id) => {
    const trip = {
      id: id,
      dateStart: dateStart
    };
    this.props.setDateStart(trip);
  }

  setDateEndAt = (dateEnd, id) => {
    const trip = {
      id: id,
      dateEnd: dateEnd
    };
    this.props.setDateEnd(trip);
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
                      toggleEditingAt={this.toggleEditingAt}
                      saveEditingAt={this.saveEditingAt}
                      setNameAt={this.setNameAt}
                      setDateStartAt={this.setDateStartAt}
                      setDateEndAt={this.setDateEndAt}
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
  setTripName: (trip) => dispatch(setTripNameDispatcher(trip)),
  setDateStart: (trip) => dispatch(setTripDateStartDispatcher(trip)),
  setDateEnd: (trip) => dispatch(setTripDateEndDispatcher(trip))
});

export default hot(module)(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
