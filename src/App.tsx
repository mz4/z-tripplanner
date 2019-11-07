import axios from 'axios';
import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { setTripDateEndDispatcher, setTripDateStartDispatcher, setTripNameDispatcher, tripsListDispatcher } from '../src/actions/tripsActions';
import getAPIUrl from './constants/serverAPI';
import Counter from './Counter';
import './css/main.scss';
import TripList from './TripList';



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

  componentDidMount() {
    const { token } = this.props;
    this.props.tripsListLoad(token);
  }

  toggleConfirmationAt = (id: String, isConfirmed: Boolean) => {
    const isConfirmedToggled = !isConfirmed;
    const { token } = this.props;
    const host = getAPIUrl();
    const url = 'api/trip/' + id;
    axios
      .put(
        host + url,
        { 
          isConfirmed: isConfirmedToggled 
        },
        { headers:
          {
            "Authorization" : `Bearer ${token}`
          }
        })
      .then(data => {
        this.props.tripsListLoad(token);
      })
      .catch(error => {
        throw error;
      });
  }

  removeTripAt = (id: string) => {
    const { token } = this.props;
    const host = getAPIUrl();
    const url = 'api/trip/' + id;
    axios
      .delete(
        host + url,
        { headers:
          {
            "Authorization" : `Bearer ${token}`
          }
        })
      .then(data => {
        this.props.tripsListLoad(token);
      })
      .catch(error => {
        throw error;
      });
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
        { headers:
          {
            "Authorization" : `Bearer ${token}`
          }
        })
      .then(data => {
        this.props.tripsListLoad(token);
      })
      .catch(error => {
        throw error;
      });
  }

  toggleEditingAt = (id: String, isEditing: Boolean) => {
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
        { headers:
          {
            "Authorization" : `Bearer ${token}`
          }
        })
      .then(data => {
        this.props.tripsListLoad(token);
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

  private handleChange = e =>
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    })

  private newTripSubmitHandler = e => {
    e.preventDefault();
    const trip: MyTrip = {
      id: '',
      key: '',
      name: '',
      dateStart: '',
      dateEnd: '',
      isConfirmed: false,
      isEditing: false,
    };
    const { token } = this.props;
    const { form } = this.state;

    trip.name = form.name;
    trip.dateStart = form.dateStart;
    trip.dateEnd = form.dateEnd;
    trip.isConfirmed = false;
    trip.isEditing = false;

    const host = getAPIUrl();
    const url = 'api/trip';
    axios
      .post(
        host + url,
        trip,
        { headers:
          {
            "Authorization" : `Bearer ${token}`
          }
        })
      .then(data => {
        this.props.tripsListLoad(token);
      })
      .catch(error => {
        throw error;
      });

  }

  private getTotalTrips = (trips) => trips.length;

  getConfirmedTrips = (trips) =>
    trips.reduce(
      (total, trip) => trip.isConfirmed ? total + 1 : total,
      0
    );

  render() {

    return (
      <Query query={GET_TRIPS}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>

          console.log('******************')
          console.log(JSON.stringify(data.trips))
          console.log('******************')

          const trips = data.trips;
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

                  <form onSubmit={this.newTripSubmitHandler}>
                    <div className="destination">
                      <div className="row">
                        <div className="col-md-4">
                          <input
                            type="text"
                            name="name"
                            value={this.state.form.name}
                            placeholder="Name" 
                            onChange={this.handleChange}
                        />
                        </div>
                        <div className="col-md-2">
                          <input
                            type="text"
                            name="dateStart"
                            value={this.state.form.dateStart}
                            placeholder="Date Start" 
                            onChange={this.handleChange}
                        />
                        </div>
                        <div className="col-md-2">
                          <input
                            type="text"
                            name="dateEnd"
                            value={this.state.form.dateEnd}
                            placeholder="Date End"
                            onChange={this.handleChange} 
                          />
                        </div>
                        <div className="col-md-2">
                          <button type="submit" name="submit" value="submit">
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>

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
                    toggleConfirmationAt={this.toggleConfirmationAt}
                    toggleEditingAt={this.toggleEditingAt}
                    saveEditingAt={this.saveEditingAt}
                    setNameAt={this.setNameAt}
                    setDateStartAt={this.setDateStartAt}
                    setDateEndAt={this.setDateEndAt}
                    removeTripAt={this.removeTripAt}
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
    )}
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
