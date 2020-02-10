import React from 'react'
import { Router } from '@reach/router'
import Login from '../components/login/login'
import PrivateRoute from '../components/private-route'
import Drivers from '../components/drivers/drivers'
import Orders from '../components/orders/orders'
import Clients from '../components/clients/clients'

const App = () => (
  <Router>
    <PrivateRoute path="/app/drivers" component={Drivers} />
    <PrivateRoute path="/app/orders" component={Orders} />
    <PrivateRoute path="/app/clients" component={Clients} />
    <Login path="/app/login" />
  </Router>
)
export default App
