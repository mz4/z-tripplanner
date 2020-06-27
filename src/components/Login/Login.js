import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setAuth } from '../../actions/authActions'
import LoginForm from './LoginForm'
import axios from 'axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch();


  const submitHandler = e => {
    e.preventDefault()
    const body = {}
    body.email = username
    body.password = password
    console.log('login------')
    console.log(username)
    console.log(password)
    axios.post(`http://localhost:3030/signin`, body)
      .then(res => {
        cookies.set('token', res.data.token, { path: '/' })
        cookies.set('auth', true, { path: '/' })
        dispatch(setAuth(true, res.data.token, ''))
      })
  }

  const handleUserName = e => {
    e.preventDefault()
    setUsername(e.target.value)
  }

  const handlePassword = e => {
    e.preventDefault()
    setPassword(e.target.value)
  }

  return (
    <div>
      <LoginForm
        username={username}
        password={password}
        submitHandler={submitHandler}
        handleUserName={handleUserName}
        handlePassword={handlePassword}
      />
    </div>
  )
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

export default connect(mapStateToProps)(Login)