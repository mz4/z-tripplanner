import * as React from "react"
import styled, { ThemeProvider } from "styled-components"
import lightTheme from '../theme/lightTheme'
import darkTheme from '../theme/darkTheme'
import { createGlobalStyle } from 'styled-components'

interface AppContextInterface {
  toggle: () => void
}

const ThemeToggleContext = React.createContext<AppContextInterface | any>('');

export const useTheme = () => React.useContext(ThemeToggleContext)

export const ThemeProviderContext = ({ children }) => {
  const [themeState, setThemeState] = React.useState("light")
  const [theme, setTheme] = React.useState(lightTheme)

  const toggle = () => {
    const mode = themeState === "light" ? "dark" : "light"
    console.log("mode: ", mode)
    if (mode == "light") {
      setTheme(lightTheme)
      document.body.style.backgroundColor = '#f3f3f3';
      setThemeState("light")
    } else {
      setTheme(darkTheme)
      document.body.style.backgroundColor = '#303030';
      setThemeState("dark")
    }
  }

  return (
    <ThemeToggleContext.Provider value={{ toggle: toggle }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  )

}