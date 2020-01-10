import React from 'react'
import { Link } from 'gatsby'
import { isLoggedIn, getUser } from '../services/auth'
import Login from '../components/login/login'
import Dispatch from '../components/dispatch'
import PrivateRoute from '../components/private-route'

export default () => (
  <>
    {isLoggedIn() ? (
      <PrivateRoute path="/app/dispatch" component={Dispatch} />
    ) : (
      <Login />
    )}
  </>
)
