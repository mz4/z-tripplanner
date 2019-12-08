import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import App from './App';
import Login from './Login';
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
  console.log('--ROUTES-----');
  console.log(auth);
  return (
    <div>
      {
        <Switch>
          <PrivateRoute exact path="/" component={App} isAuthenticated={auth} token={token} />
          <PrivateRoute path="/*" component={App} isAuthenticated={auth} token={token} />
        </Switch>
      }
    </div>
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
          {...props} />
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
export default withRouter(connect(mapStateToProps)(AppRouter));
