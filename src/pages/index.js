import React from 'react'
import { Link } from 'gatsby'
import { isLoggedIn, getUser } from '../services/auth'
import Login from '../components/login'
import Drivers from '../components/drivers'
import PrivateRoute from '../components/private-route'

export default () => (
  <>
    {isLoggedIn() ? (
      <PrivateRoute path="/app/drivers" component={Drivers} />
    ) : (
      <Login />
    )}
  </>
)
