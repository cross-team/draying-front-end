import React from 'react'
import NavBar from './nav-bar'
import Container from '@material-ui/core/Container'
import SEO from './seo'
import './layout.css'

const Layout = ({ children }) => (
  <>
    <SEO />
    <NavBar />
    <Container maxWidth="lg">{children}</Container>
  </>
)
export default Layout
