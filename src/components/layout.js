import React from 'react'
import NavBar from './nav-bar'
import { Container, makeStyles } from '@material-ui/core/'
import SEO from './seo'
import './layout.css'

const useStyles = makeStyles(theme => ({
  container: {
    padding: 0,
    margin: 0,
  }
}))

const Layout = ({ children }) => {
  const classes = useStyles()
  return (
    <div>
      <SEO />
      <NavBar />
      <Container maxWidth="lg" className={classes.container}>{children}</Container>
    </div>
  )
}
export default Layout
