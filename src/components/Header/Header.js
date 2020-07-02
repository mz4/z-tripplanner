import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from '../../components/Elements/button/Button'
import i18n from '../../utils/i18ns'

const Header_main = styled.header`
  height: 4rem;
  position: sticky;
  top: 0px;
  background-color: ${props => props.theme.color.headerbackground};
  border-bottom: 1px solid $color-border;
  z-index: 999;
`;

const Header_menu = styled.ul`
  align-items: center;
  display: flex;
  list-style: none;
  margin: 0;
`;

const Header_list = styled.li``;

const Header_logo =  styled.div`
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  padding-left: 1rem;
`;

const Header_right = styled.li`
  margin-left: auto;
`;

const Header__settings = styled.div`
  margin-top: 0.7rem;
  margin-right: 1rem;
  padding-left: 1rem;
`;

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
      <Header_menu>
        <Header_list>
          <Header_logo>
            <Title>ASGARD </Title>
            <Sub_title>{i18n.t('Title')}</Sub_title>
          </Header_logo>
        </Header_list>
        <Header_right>
          <Header__settings>
            <Button 
              appearance = "primary" 
              type = "submit" 
              name = "submit" 
              value = "submit"
              isLoading = {false}
              loadingText = {null}
              isLink = {false}
              isDisabled = {false}
              isUnclickable = {false}
              containsIcon = {false}
              size = 'medium'
              onClick = {themeToggle}
            >
              Theme
            </Button>
            <Button 
              appearance = "primary" 
              type = "submit" 
              name = "submit" 
              value = "submit"
              isLoading = {false}
              loadingText = {null}
              isLink = {false}
              isDisabled = {false}
              isUnclickable = {false}
              containsIcon = {false}
              size = 'medium'
              onClick = {() => setLanguage('it')}
            >
              IT
            </Button>
            <Button 
              appearance = "secondary" 
              type = "submit" 
              name = "submit" 
              value = "submit"
              isLoading = {false}
              loadingText = {null}
              isLink = {false}
              isDisabled = {false}
              isUnclickable = {false}
              containsIcon = {false}
              size = 'medium'
              onClick = {() => setLanguage('en')}
            >
              EN
            </Button>
            <Button 
              appearance = "tertiary" 
              type = "submit" 
              name = "submit" 
              value = "submit"
              isLoading = {false}
              loadingText = {null}
              isLink = {false}
              isDisabled = {false}
              isUnclickable = {false}
              containsIcon = {false}
              size = 'medium'
              onClick = {Logout}
            >
              {i18n.t('Logout')}
            </Button>
          </Header__settings>
        </Header_right>
      </Header_menu>
    </Header_main>
  )
}

Header.propTypes = {
  Logout: PropTypes.func.isRequired,
  themeToggle: PropTypes.func.isRequired,
  setLanguage: PropTypes.func.isRequired,
};

export default Header

