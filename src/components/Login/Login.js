import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuth } from '../../actions/authActions'
import LoginForm from './LoginForm'
import axios from 'axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
    this.newTripSubmitHandler = this.newTripSubmitHandler.bind(this)
    this.handleUserName = this.handleUserName.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
  }

  newTripSubmitHandler = e => {
    e.preventDefault()
    const {username, password } = this.state
    const body = {}
    body.email = username
    body.password = password
    axios.post(`http://localhost:3030/signin`, body)
      .then(res => {
        cookies.set('token', res.data.token, { path: '/' })
        cookies.set('auth', true, { path: '/' })
        this.props.setAuth(true, res.data.token, '')
      })
  }

  handleUserName = e => {
    e.preventDefault()
    this.setState({
      username: e.target.value
    })
  }

  handlePassword = e => {
    e.preventDefault()
    this.setState({
      password: e.target.value
    })
  }

  render() {
    const {username, password} = this.state
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
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuthenticated,
    token: state.auth.token,
    authErrorMsg: state.auth.authErrorMsg,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAuth: (
      isAuthenticated, 
      token, 
      authErrorMsg) => 
        dispatch(
          setAuth(
            isAuthenticated, 
            token, 
            authErrorMsg)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)