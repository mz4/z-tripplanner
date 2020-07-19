import React, { useState } from 'react'
import { hot } from 'react-hot-loader'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import Cookies from 'universal-cookie'
import { withTranslation } from 'react-i18next'
import { useTheme } from "../../context/ThemeContext";
import { logoutAuth } from '../../actions/authActions'
import Header from '../../components/Header/Header'
import '../../css/main.scss';

const cookies = new Cookies();

interface MyProps {
  token: '',
  t: (ReactNode) => string,
  i18n?: any;
  logoutAuth: (isAuthenticated: boolean, token: string, authErrorMsg: string) => void,
};

const Navbar: React.FC<MyProps> = (props) => {
  const themeToggle = useTheme();
  const [values, setValues] = useState({ language: 'en' });

  const Logout = () => {
    cookies.remove('token')
    cookies.remove('auth')
    props.logoutAuth(false, '', '');
  }

  const setLanguage = (language: string) => {
    setValues({
      ...values,
      language: language
    });
    props.i18n.changeLanguage(language);
  }

  return (
    <React.Fragment>
      <Header
        setLanguage = {(language) => setLanguage(language)}
        themeToggle={() => themeToggle.toggle()}
        Logout={Logout}
      />
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth.isAuthenticated,
  }
}

const mapDispatchToProps = dispatch => ({
  logoutAuth: (
    isAuthenticated, 
    token, 
    authErrorMsg) => 
      dispatch(
        logoutAuth(
          isAuthenticated, 
          token, 
          authErrorMsg)),
});

export default compose(
  hot(module),
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps)
)(Navbar)