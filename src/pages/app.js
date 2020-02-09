import React from 'react'
import { Router } from '@reach/router'
import Login from '../components/login/login'
import PrivateRoute from '../components/private-route'
import Drivers from '../components/drivers/drivers'

const App = () => (
  <Router>
    <PrivateRoute path="/app/drivers" component={Drivers} />
    <PrivateRoute path="/app/orders" component={Drivers} />
    <PrivateRoute path="/app/clients" component={Drivers} />
    <Login path="/app/login" />
  </Router>
)
export default App
