import React from 'react'
import NavBar from './nav-bar'
import Container from '@material-ui/core/Container'

const Layout = ({ children }) => (
  <Container maxWidth="lg">
    <NavBar />
    {children}
  </Container>
)
export default Layout
