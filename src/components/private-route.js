import React from 'react'
import { navigate } from 'gatsby'
import { isLoggedIn } from '../services/auth'
import Layout from './layout'

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  if (!isLoggedIn() && location.pathname !== `/app/login`) {
    navigate('/app/login')
    return null
  }
  return (
    <Layout>
      <Component {...rest} />
    </Layout>
  )
}
export default PrivateRoute
