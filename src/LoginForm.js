import React from 'react';

const Trip = props =>
<React.Fragment>
  <div className="AppLogin">
    <div className="main">

      <header className="header">
        <div className="header__logo">
          <h2>Login</h2>
        </div>
      </header>

      <form onSubmit={props.newTripSubmitHandler}>
        <div className="destination">

          <div className="row">
            <div className="col-md-offset-1 col-md-9 mb-md-1">
              <input
                type="text"
                value={props.username}
                placeholder="Username" 
                onChange={props.handleUserName}
            />
            </div>
          </div>

          <div className="row">
            <div className="col-md-offset-1 col-md-9 mb-md-1">
              <input
                type="text"
                value={props.password}
                placeholder="Password" 
                onChange={props.handlePassword}
            />
            </div>
          </div>

          <div className="row">
            <div className="col-md-10 mb-md-1">
              <button type="submit" name="submit" value="submit">
                Submit
              </button>
            </div>
          </div>

        </div>
      </form>
    </div>
  </div>
</React.Fragment>

// Trip.propTypes = {
//   id: PropTypes.number.isRequired,
//   name: PropTypes.string.isRequired,
//   handleConfirmation: PropTypes.func.isRequired,
// };

export default Trip;
