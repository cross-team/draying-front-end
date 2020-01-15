import React from "react"
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
 
const theme = createMuiTheme({
  palette: {
    success: {
      main: '#28a744',
      light: '#84e198',
      dark: '#1b6f2f',
      contrastText: '#000'
    },
    danger: {
      main: '#dc3644',
      light: '#ed9298',
      dark: '#981b25',
      contrastText: '#000'
    },
    warning: {
      main: '#ffc107',
      light: '#ffe699',
      dark: '#cc9900',
      contrastText: '#fff'
    },
    background: {
      paper: '#fafafa'
    }
  }
})
 
  const Theme = ({ path, children }) => {
    return (
      <ThemeProvider theme={theme}>
          {children}
      </ThemeProvider>
    )
  }
  export default Theme