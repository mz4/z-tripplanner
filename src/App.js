import React, { Component } from 'react';
import './App.css';

import TripList from './TripList';
import Counter from './Counter';

class App extends Component {

  state = {
    isFiltered: false,
    pendingTrip: "",
    trips: [
      {
        name: 'Rome',
        dateStart: '19/08/2019',
        dateEnd: '29/08/2019',
        isConfirmed: false,
        isEditing: false
      },
      {
        name: 'Paris',
        dateStart: '15/06/2019',
        dateEnd: '29/06/2019',
        isConfirmed: true,
        isEditing: false
      },
      {
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

  removeTripAt = index =>
    this.setState({
      trips: [
        ...this.state.trips.slice(0, index),
        ...this.state.trips.slice(index + 1)
      ]
    });

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

  toggleFilter = () =>
    this.setState({ isFiltered: !this.state.isFiltered });

  handleNameInput = e =>
    this.setState({ pendingTrip: e.target.value });

  newTripSubmitHandler = e => {
    e.preventDefault();
    this.setState({
      trips: [
        {
          name: this.state.pendingTrip,
          dateStart: '01/01/2025',
          dateEnd: '01/01/2025',
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

    return (
      <div className="App">
        <header>
          <h2>Trips List</h2>
          <form onSubmit={this.newTripSubmitHandler}>
            <input
              type="text"
              onChange={this.handleNameInput}
              value={this.state.pendingTrip}
              placeholder="Where do you want to go?" />
            <button type="submit" name="submit" value="submit">Submit</button>
          </form>
        </header>
        <div className="main">
          <div className="options">

            <div className="filter">
              <label>
                Show Confirmed
                <input
                  type="checkbox"
                  onChange={this.toggleFilter}
                  checked={this.state.isFiltered} />
              </label>
            </div>

            <Counter
              totalTrips={totalTrips}
              numberConfirmed={numberConfirmed}
              numberUnconfirmed={numberUnconfirmed} />

          </div>

          <TripList
            trips={this.state.trips}
            toggleConfirmationAt={this.toggleConfirmationAt}
            toggleEditingAt={this.toggleEditingAt}
            setNameAt={this.setNameAt}
            setDateStartAt={this.setDateStartAt}
            setDateEndAt={this.setDateEndAt}
            isFiltered={this.state.isFiltered}
            removeTripAt={this.removeTripAt}
            pendingTrip={this.state.pendingTrip}
          />

        </div>
      </div>
    );
  }
}

export default App;
