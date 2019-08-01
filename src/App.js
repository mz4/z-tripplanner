import React, { Component } from 'react';

import TripList from './TripList';
import Counter from './Counter';

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
      },
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
        },
        {
          id: 3,
          name: 'Budapest',
          dateStart: '01/02/2019',
          dateEnd: '08/02/2019',
          isConfirmed: false,
          isEditing: false
        }
      ]
    };
  
  }

  toggleTripPropertyAt = (property, id) =>
    this.setState({
      trips: this.state.trips.map((trip, index) => {
        if (trip.id === id) {
          return {
            ...trip,
            [property]: !trip[property]
          };
        }
        return trip;
      })
    });

  toggleConfirmationAt = id =>
    this.toggleTripPropertyAt("isConfirmed", id);

  removeTripAt = (id) => {
    this.setState({
      trips: this.state.trips.filter(trip => trip.id !== id)
    });
  }

  toggleEditingAt = id =>
    this.toggleTripPropertyAt("isEditing", id);

  setNameAt = (name, id) =>
    this.setState({
      trips: this.state.trips.map((trip, index) => {
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
      trips: this.state.trips.map((trip, index) => {
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
      trips: this.state.trips.map((trip, index) => {
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
    const { trips, form } = this.state;
    let tripId = 0;
    let newId = 0;
    trips.map((trip) => {
      if (trip.id > tripId) {
        tripId = trip.id
      }
    });
    newId = parseInt(tripId) + 1;
    this.setState({
      trips: [
        {
          id: newId,
          name: form.name,
          dateStart: form.dateStart,
          dateEnd: form.dateEnd,
          isConfirmed: false,
          isEditing: false
        },
        ...this.state.trips
      ],
      form: {
        name: '',
        dateStart: '',
        dateEnd: ''
      }
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
              trips={this.state.trips}
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

export default App;
