import React, { Component } from 'react';

import TripList from './TripList';
import Counter from './Counter';

class App extends Component {

  state = {
    showConfirmed: false,
    showUnConfirmed: false,
    showAll: true,
    pendingTrip: "",
    trips: [
      {
        id: 0,
        name: 'Rome',
        dateStart: '19/08/2019',
        dateEnd: '29/08/2019',
        isConfirmed: false,
        isEditing: false
      },
      {
        id: 1,
        name: 'Paris',
        dateStart: '15/06/2019',
        dateEnd: '29/06/2019',
        isConfirmed: true,
        isEditing: false
      },
      {
        id: 2,
        name: 'Malta',
        dateStart: '01/02/2019',
        dateEnd: '08/02/2019',
        isConfirmed: false,
        isEditing: false
      }
    ]
  };

  toggleTripPropertyAt = (property, indexToChange) =>
    this.setState({
      trips: this.state.trips.map((trip, index) => {
        if (index === indexToChange) {
          return {
            ...trip,
            [property]: !trip[property]
          };
        }
        return trip;
      })
    });

  toggleConfirmationAt = index =>
    this.toggleTripPropertyAt("isConfirmed", index);

  removeTripAt = (index) => {
    // var arrb = this.state.trips.filter(trip => trip.id !== index);
    // // var prova = this.state.trips.splice(this.state.trips.findIndex(trip => trip.id !== index), 1);
    // console.log(arrb);
    this.setState({
      trips: this.state.trips.filter(trip => trip.id !== index)
    });
  }

  toggleEditingAt = index =>
    this.toggleTripPropertyAt("isEditing", index);

  setNameAt = (name, indexToChange) =>
    this.setState({
      trips: this.state.trips.map((trip, index) => {
        if (index === indexToChange) {
          return {
            ...trip,
            name
          };
        }
        return trip;
      })
    });

  setDateStartAt = (dateStart, indexToChange) =>
    this.setState({
      trips: this.state.trips.map((trip, index) => {
        if (index === indexToChange) {
          return {
            ...trip,
            dateStart
          };
        }
        return trip;
      })
    });

  setDateEndAt = (dateEnd, indexToChange) =>
    this.setState({
      trips: this.state.trips.map((trip, index) => {
        if (index === indexToChange) {
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
      showConfirmed: true,
      showUnConfirmed: false,
      showAll: false,
    });
  }

  setUnConfirmed() {
    this.setState({ 
      showConfirmed: false,
      showUnConfirmed: true,
      showAll: false,
    });
  }

  setAll() {
    this.setState({ 
      showConfirmed: true,
      showUnConfirmed: true,
      showAll: true,
    });
  }

  handleNameInput = e =>
    this.setState({ pendingTrip: e.target.value });

  newTripSubmitHandler = e => {
    e.preventDefault();
    this.setState({
      trips: [
        {
          name: this.state.pendingTrip,
          dateStart: '',
          dateEnd: '',
          isConfirmed: false,
          isEditing: false
        },
        ...this.state.trips
      ],
      pendingTrip: ''
    });
  }

  getTotalTrips = () => this.state.trips.length;

  getConfirmedTrips = () =>
    this.state.trips.reduce(
      (total, trip) => trip.isConfirmed ? total + 1 : total,
      0
    );

  render() {
    const totalTrips = this.getTotalTrips();
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
                <h2>Trip Planner</h2>
              </div>
            </header>

            <form onSubmit={this.newTripSubmitHandler}>
              <div className="destination">
                <div className="row">
                  <div className="col-3-of-4">
                    <input
                      type="text"
                      onChange={this.handleNameInput}
                      value={this.state.pendingTrip}
                      placeholder="..." 
                    />
                  </div>
                  <div className="col-1-of-4">
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
              showConfirmed={this.state.showConfirmed}
              showUnConfirmed={this.state.showUnConfirmed}
              showAll={this.state.showAll}
            />

            <TripList
              trips={this.state.trips}
              toggleConfirmationAt={this.toggleConfirmationAt}
              toggleEditingAt={this.toggleEditingAt}
              setNameAt={this.setNameAt}
              setDateStartAt={this.setDateStartAt}
              setDateEndAt={this.setDateEndAt}
              removeTripAt={this.removeTripAt}
              pendingTrip={this.state.pendingTrip}
              showConfirmed={this.state.showConfirmed}
              showUnConfirmed={this.state.showUnConfirmed}
              showAll={this.state.showAll}
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

export default App;
