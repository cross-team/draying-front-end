import React from 'react'
import NavBar from './nav-bar'
import Container from '@material-ui/core/Container'
import './layout.css'

const Layout = ({ children }) => (
  <>
    <NavBar />
    <Container maxWidth="lg">{children}</Container>
  </>
)
export default Layout
