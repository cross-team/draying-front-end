import React from 'react'
import { isLoggedIn } from '../services/auth'
import Drivers from '../components/drivers/drivers'
import Login from '../components/login/login'
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
