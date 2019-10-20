import React, { Component } from 'react';
import { connect } from 'react-redux';
import auth from '../src/actions/authActions';
import LoginForm from './LoginForm';
// import { deleteCookie, getCookie, setCookie } from '../../common/Constants';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.newTripSubmitHandler = this.newTripSubmitHandler.bind(this);
    this.handleUserName = this.handleUserName.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }


  newTripSubmitHandler = e => {
    e.preventDefault();
    console.log('submit');
  }

  handleUserName = e => {
    e.preventDefault();
    console.log('handle username');
  }

  handlePassword = e => {
    e.preventDefault();
    console.log('handle password');
  }

  render() {
    const {username, password} = this.state;
    return (
      <div>
        <LoginForm
          username={username}
          password={password}
          newTripSubmitHandler={this.newTripSubmitHandler}
          handleUserName={this.handleUserName}
          handlePassword={this.handlePassword}
        />
      </div>
    )
  }
}

Login.propTypes = {
  auth: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuthenticated,
    token: state.auth.token,
    authErrorMsg: state.auth.authErrorMsg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    auth: (
      isAuthenticated, 
      token, 
      authErrorMsg) => 
        dispatch(
          auth(
            isAuthenticated, 
            token, 
            authErrorMsg)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);




// import React from 'react';
// function Login() {
//   const greeting = 'Hello Function Component!';
//   return <h1>{greeting}</h1>;
// }
// export default Login;

// import React from 'react';
// import { connect } from 'react-redux';
// // import { IntlProvider, FormattedMessage } from 'react-intl';
// // import { Button, Form, Image, Grid, Header, Segment } from 'semantic-ui-react';
// import PropTypes from 'prop-types';
// // import Loadable from 'react-loadable';
// // import Loading from '../../layout/Loading';
// // import { resetActionLog } from '../../../store/actions/actionLogAction';
// import auth from '../../../store/actions/authActions';
// // import Logo from '../../layout/TopMenu/logo.png';
// // import io from '../../common/io';
// // import serverisOffLine from './../../../store/actions/serverOfflineAction';
// // import { deleteCookie, getCookie, setCookie } from '../../common/Constants';
// // import validator from '../../common/validator';
// // import messages_en from '../../../translations/en.json';
// // import Uuid from '../../common/ActionHelper';

// class Login extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: '',
//       password: '',
//       failedToLogIn: false,
//       renderComponent: true,
//       touched: {
//         username: false,
//         password: false,
//       },
//       errors: {},
//       errorMsg: '',
//       modalOpen: false,
//       token: '',
//       userId: '',
//     };
//     this.onSubmit = this.onSubmit.bind(this);
//   }

//   onSubmit(e) {
//     e.preventDefault();
//     if (this.state.username.length === 0 || this.state.password.length === 0) {
//       this.props.auth(false, '', 'Both username and password are mandatory');
//     } else {
//       io.disconnect();
//       io.connect();
//       io.emit('login', { username: this.state.username, password: this.state.password });
//     }
//   }

//   setName(value) {
//     this.setState(() => ({
//       username: value,
//     }));
//   }

//   setPassword(value) {
//     this.setState(() => ({
//       password: value,
//     }));
//   }

//   render() {
//     return (
//       <div className="loginPage">
//         <Grid textAlign="center" className="formWrap" verticalAlign="middle">
//           <Grid.Column style={{ maxWidth: 500 }}>
//             <Segment raised>
//               <Form size="big" onSubmit={this.onSubmit}>
//                 <Image src={Logo} className="loginImage" />
//                 <Header>
//                   <FormattedMessage id="login.header" defaultMessage="Storage Manager" />
//                 </Header>
//                 <Form.Input
//                   fluid
//                   icon="user"
//                   error={this.checkError('username')}
//                   iconPosition="left"
//                   placeholder="Username"
//                   type="text"
//                   onChange={(e, { value }) => this.setName(value)}
//                   onBlur={this.handleBlur('username')}
//                 />
//                 <Form.Input
//                   fluid
//                   icon="lock"
//                   error={this.checkError('password')}
//                   iconPosition="left"
//                   placeholder="Password"
//                   type="password"
//                   value={this.state.password}
//                   onChange={(e, { value }) => this.setPassword(value)}
//                   onBlur={this.handleBlur('password')}
//                 />
//                 <Button className="loginBtn bigBtn" fluid size="big" disabled={this.state.submitDisable} >
//                   <FormattedMessage id="login.submit" defaultMessage="Login" />
//                 </Button>
//               </Form>
//               <div className="loginMandatory">
//                 {authErrorMsg ? authErrorMsg : null}
//               </div>
//             </Segment>
//           </Grid.Column>
//         </Grid>
//       </div>
//     );
//   }
// }

// Login.propTypes = {
//   auth: PropTypes.func.isRequired,
// };

// const mapStateToProps = (state) => {
//   return {
//     isAuth: state.auth.isAuthenticated,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     auth: (isAuthenticated, token, authErrorMsg) => dispatch(auth(isAuthenticated, token, authErrorMsg)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Login);
