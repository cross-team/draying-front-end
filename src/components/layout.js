import React from 'react'
import NavBar from './nav-bar'
import { Container, makeStyles } from '@material-ui/core/'
import SEO from './seo'
import './layout.css'

const useStyles = makeStyles(theme => ({
  container: {
    padding: 0,
    margin: 0,
    height: '100vh',
  },
}))

const Layout = ({ children }) => {
  const classes = useStyles()
  return (
    <div>
      <SEO />
      <Container maxWidth={false} className={classes.container}>
        <NavBar />
        {children}
      </Container>
    </div>
  )
}
export default Layout
