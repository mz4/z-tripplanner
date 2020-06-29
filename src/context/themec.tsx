import * as React from "react"
import styled, { ThemeProvider } from "styled-components"
import lightTheme from '../theme/lightTheme'
import darkTheme from '../theme/darkTheme'
import { createGlobalStyle } from 'styled-components'

export const myContext = React.createContext('llll');

export const myProviderContext = ({ children }) => {
  return (
    <myContext.Provider value="ciaobellu">
        {children}
    </myContext.Provider>
  )
}
