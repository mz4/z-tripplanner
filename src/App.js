import React, { Component } from 'react';
import { connect } from 'react-redux';
import TripList from './TripList';
import Counter from './Counter';
import { hot } from 'react-hot-loader';
import { tripsListDispatcher } from '../src/actions/tripsActions';
import './css/main.scss';

class App extends Component {
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
      }
    };
  }

  toggleTripPropertyAt = (property, id) =>
    console.log('toggle tri at');
    // this.setState({
    //   trips: this.props.trips.map((trip, index) => {
    //     if (trip.id === id) {
    //       return {
    //         ...trip,
    //         [property]: !trip[property]
    //       };
    //     }
    //     return trip;
    //   })
    // });

  toggleConfirmationAt = id =>
    this.toggleTripPropertyAt("isConfirmed", id);

  removeTripAt = (id) => {
    console.log('trip removed!');
    // this.setState({
    //   trips: this.props.trips.filter(trip => trip.id !== id)
    // });
  }

  toggleEditingAt = id =>
    this.toggleTripPropertyAt("isEditing", id);

  setNameAt = (name, id) =>
    this.setState({
      trips: this.props.trips.map((trip, index) => {
        if (id === trip.id) {
          return {
            ...trip,
            name
          };
        }
        return trip;
      })
    });

  setDateStartAt = (dateStart, id) =>
    this.setState({
      trips: this.props.trips.map((trip, index) => {
        if (id === trip.id) {
          return {
            ...trip,
            dateStart
          };
        }
        return trip;
      })
    });

  setDateEndAt = (dateEnd, id) =>
    this.setState({
      trips: this.props.trips.map((trip, index) => {
        if (id === trip.id) {
          return {
            ...trip,
            dateEnd
          };
        }
        return trip;
      })
    });

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
    });
  }

  handleNameInput = e =>
    this.setState({
      form: {
        ...this.state.form,
        name: e.target.value
      }
    });

  handleDateStart = e =>
    this.setState({
      form: {
        ...this.state.form,
        dateStart: e.target.value
      }
    });

  handleDateEnd = e =>
    this.setState({
      form: {
        ...this.state.form,
        dateEnd: e.target.value
      }
    });

  newTripSubmitHandler = e => {
    e.preventDefault();
    const trip = {};
    const { trips } = this.props;
    const { form } = this.state;
    let tripId = 0;
    let newId = 0;
    trips.map((trip) => {
      if (trip.id > tripId) {
        tripId = trip.id
      }
    });
    newId = parseInt(tripId) + 1;
    console.log('new trip!', newId);
    trip.id = newId;
    trip.name = form.name;
    trip.dateStart = form.dateStart;
    trip.dateEnd = form.dateEnd;
    trip.isConfirmed = false;
    trip.isEditing = false;
    this.props.tripsListLoad();
  }

  getTotalTrips = (trips) => trips.length;

  getConfirmedTrips = () =>
    this.props.trips.reduce(
      (total, trip) => trip.isConfirmed ? total + 1 : total,
      0
    );

  render() {
    const { trips } = this.props;
    const totalTrips = this.getTotalTrips(trips);
    const numberConfirmed = this.getConfirmedTrips();
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
                      value={this.state.form.name}
                      placeholder="Name" 
                      onChange={this.handleNameInput}
                  />
                  </div>
                  <div className="col-md-2">
                    <input
                      type="text"
                      value={this.state.form.dateStart}
                      placeholder="Date Start" 
                      onChange={this.handleDateStart}
                  />
                  </div>
                  <div className="col-md-2">
                    <input
                      type="text"
                      value={this.state.form.dateEnd}
                      placeholder="Date End"
                      onChange={this.handleDateEnd} 
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
              trips={this.props.trips}
              toggleConfirmationAt={this.toggleConfirmationAt}
              toggleEditingAt={this.toggleEditingAt}
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
        {/* 
        <div className="challenge">
          <div className="header">Header</div>
          <div className="small-box-1">Small box 1</div>
          <div className="small-box-2">Small box 2</div>
          <div className="small-box-3">Small box 3</div>
          <div className="main-content">Main content</div>
          <div className="sidebar">Sidebar</div>
          <div className="footer">Footer</div>
        </div> */}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    trips: state.trips
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    tripsListLoad: () => dispatch(tripsListDispatcher())
  }
};

export default hot(module)(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
