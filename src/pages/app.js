import React from 'react'
import { Router } from '@reach/router'
import Login from '../components/login/login'
import PrivateRoute from '../components/private-route'
import Dispatch from '../components/dispatch'
import Shell from '../components/shell'

const App = () => (
  <Router>
     <PrivateRoute path="/app/dispatch" component={Dispatch} />
     <PrivateRoute path="/app/shell" component={Shell} />
     <Login path="/app/login" />
  </Router>
)
export default App
