import React from 'react'
import NavBar from './nav-bar'
import { Container } from '@material-ui/core/'
import SEO from './seo'
import './layout.css'

const Layout = ({ children }) => {
  return (
    <div>
      <SEO />
      <NavBar />
      <Container maxWidth="lg">{children}</Container>
    </div>
  )
}
export default Layout
