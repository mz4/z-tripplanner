import React from 'react';
import { 
  HashRouter as Router,
  Route, 
  Switch
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import App from '../App/App';
import TripView from '../TripView/TripView';
import Login from '../../components/Login/Login';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
/**
 * Router allows to navigate through the app.
 *
 * Switch only allows to render the first that match
 * Private route checks if user is logged in
 * in case he is not login modal page will be shown
 */
const AppRouter = (props) => {
  let { auth, token } = props;
  token = cookies.get('token');
  auth = cookies.get('auth');
  return (
    <Router>
      <div>
        <Switch>
          <PrivateRoute exact path={["/", "/app"]} component={App} isAuthenticated={auth} token={token} />
          <PrivateRoute path="/a" component={TripView} isAuthenticated={auth} token={token} />
        </Switch>
      </div>
    </Router>
  );
};

/**
 * Check if user is authenticated
 *
 * if not show login component
 */
const PrivateRoute = ({ component: Component, isAuthenticated, token, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (isAuthenticated
        ? (
        <Component 
          token = {token}
          {...props} 
        />
      ) : (
        <Login />
      ))
    }
  />
);

AppRouter.defaultProps = {
  auth: false,
};

AppRouter.propTypes = {
  auth: PropTypes.bool,
};

PrivateRoute.defaultProps = {
  component: '',
  isAuthenticated: false,
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth.isAuthenticated,
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(AppRouter);
