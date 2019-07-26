import React from 'react';
import PropTypes from 'prop-types';

import TripName from './TripName';
import TripDate from './TripDate';

const Trip = props =>
  <div className="trip__item">
    <TripName
      isEditing={props.isEditing}
      handleNameEdits={e => props.setName(e.target.value)}>
      {props.name}
    </TripName>
    <TripDate
        isEditing={props.isEditing}
        handleDateEdits={e => props.setDateStart(e.target.value)}>
      {props.dateStart}
    </TripDate>
    <TripDate
        isEditing={props.isEditing}
        handleDateEdits={e => props.setDateEnd(e.target.value)}>
      {props.dateEnd}
    </TripDate>
    <label>
      <input
        type="checkbox"
        checked={props.isConfirmed}
        onChange={props.handleConfirmation} /> Confirmed
    </label>
    <button onClick={props.handeToggleEditing}>
      {props.isEditing ? "save" : "edit"}
    </button>
    <button onClick={props.handleRemove}>remove</button>

    <div className="container">
      <div className="card">
        <div className="card-head">
          <img src="https://s5.postimg.cc/wy79025cz/nike_Logo_White.png" alt="logo" className="card-logo"></img>
          <img src="https://s5.postimg.cc/j9r8yf9gn/sws1.png" alt="Shoe" className="product-img"></img>
          <div className="product-detail">
            <h2>ROME</h2> Support and Nike Zoom Air come together for a more supportive feel with high-speed responsiveness
          </div>
          <span className="back-text">
            ROME
          </span>
        </div>
        <div className="card-body">
          <div className="product-desc">
            <span className="product-title">
              Hartbee<b>spoort</b>
              <span className="badge">
                New
              </span>
            </span>
            <span className="product-caption">
              Basket Ball Collection
            </span>
            <span className="product-rating">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star grey"></i>
            </span>
          </div>
          <div className="product-properties">
            <span className="product-size">
              <h4>Size</h4>
                <ul className="ul-size">
                  <li><a href="#">7</a></li>
                  <li><a href="#">8</a></li>
                  <li><a href="#">9</a></li>
                  <li><a href="#" className="active">10</a></li>
                  <li><a href="#">11</a></li>
                </ul>
            </span>
            <span className="product-color">
              <h4>Colour</h4>
              <ul className="ul-color">
                <li><a href="#" className="orange active"></a></li>
                <li><a href="#" className="green"></a></li>
                <li><a href="#" className="yellow"></a></li>
              </ul>
            </span>
            <span className="product-price">
              USD<b>23,453</b>
            </span>
          </div>
        </div>
      </div>
    </div>

  </div>;

Trip.propTypes = {
  name: PropTypes.string.isRequired,
  dateStart: PropTypes.string.isRequired,
  dateEnd: PropTypes.string.isRequired,
  isConfirmed: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  handleConfirmation: PropTypes.func.isRequired,
  handeToggleEditing: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  setDateStart: PropTypes.func.isRequired,
  setDateEnd: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired
};

export default Trip;
