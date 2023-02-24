import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from '../../components/Elements/Link/Link'
import i18n from '../../utils/i18ns'

const Header_main = styled.header`
  align-items: center;
  background-color: ${props => props.theme.color.headerbackground};
  border-bottom: 1px solid $color-border;
  display: flex;
  height: 4rem;
  justify-content: space-between;
  list-style: none;
  margin: 0;
  padding: 0 2rem 0 2rem;
  position: sticky;
  top: 0px;
  z-index: 999;
`;

const Header_left = styled.li``;

const Header_logo =  styled.div`
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
`;

const Header_right = styled.li`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-left: auto;
  width: 20rem;
`;

// const Header__settings = styled.div`
  /* margin-top: 0.7rem;
  margin-right: 1rem;
  padding-left: 1rem; */
// `;

const Title = styled.h2`
  display: inline;
  color: ${props => props.theme.color.title};
`;

const Sub_title = styled.h3`
  display: inline;
  color: ${props => props.theme.color.subtitle};
`;

const Header = props => {
  const { setLanguage, themeToggle, Logout } = props;
  return (
    <Header_main>
        <Header_left>
          <Header_logo>
            <Title>ASGARD </Title>
            <Sub_title>{i18n.t('Title')}</Sub_title>
          </Header_logo>
        </Header_left>
        <Header_right>
          <Link onClick = {themeToggle} secondary>
            {i18n.t('changeTheme')}
          </Link>
          <Link onClick = {() => setLanguage('it')}>
            IT
          </Link>
          <Link onClick = {() => setLanguage('en')}>
            EN
          </Link>
          <Link onClick = {Logout} logout>
            Logout
          </Link>
        </Header_right>
    </Header_main>
  )
}

Header.propTypes = {
  Logout: PropTypes.func.isRequired,
  themeToggle: PropTypes.func.isRequired,
  setLanguage: PropTypes.func.isRequired,
};

export default Header

