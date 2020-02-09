import React from 'react'
import { navigate } from 'gatsby'
import Layout from './layout'

import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const IS_LOGGED_IN = gql`
  query UserSessionInfo {
    isLoggedIn @client
  }
`

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const {
    data: { isLoggedIn },
  } = useQuery(IS_LOGGED_IN)

  if (!isLoggedIn && location.pathname !== `/app/login`) {
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
