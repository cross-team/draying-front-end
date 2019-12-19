import React from 'react'
import { Router } from '@reach/router'
import Layout from '../components/layout'
import Profile from '../components/profile'
import Login from '../components/login'
import PrivateRoute from '../components/private-route'
import Dispatch from '../components/dispatch'

const App = () => (
  <Layout>
    <Router>
      <PrivateRoute path="/app/profile" component={Profile} />
      <PrivateRoute path="/app/dispatch" component={Dispatch} />
      <Login path="/app/login" />
    </Router>
  </Layout>
)
export default App
