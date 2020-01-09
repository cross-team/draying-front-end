import React from 'react'
import { Router } from '@reach/router'
import Profile from '../components/profile'
import Login from '../components/login'
import PrivateRoute from '../components/private-route'
import Drivers from '../components/drivers'

const App = () => (
  <Router>
     <PrivateRoute path="/app/drivers" component={Drivers} />
     <Login path="/app/login" />
  </Router>
)
export default App
