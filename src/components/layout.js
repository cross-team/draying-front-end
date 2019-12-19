import React from 'react'
import NavBar from './nav-bar'
import '../styles/bootstrap.scss'
import '../styles/app.scss'

const Layout = ({ children }) => (
  <div className="container">
    <NavBar />
    {children}
  </div>
)
export default Layout
