import React from 'react'
import NavBar from './nav-bar'
import '../styles/bootstrap.scss'
import '../styles/app.scss'

const Layout = ({ children }) => (
  <>
    <NavBar />
    {children}
  </>
)
export default Layout
