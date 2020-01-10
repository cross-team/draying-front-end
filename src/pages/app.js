import React from 'react'
import { Router } from '@reach/router'
import Profile from '../components/profile'
import Login from '../components/login/login'
import PrivateRoute from '../components/private-route'
import Dispatch from '../components/dispatch'

const App = () => (
  <Router>
     <PrivateRoute path="/app/dispatch" component={Dispatch} />
     <Login path="/app/login" />
  </Router>
)
export default App
