// import React from 'react'
// import { useQuery } from '@apollo/react-hooks'
// import gql from 'graphql-tag'
// import Pages from './pages'
// import Login from './pages/login'

// const IS_LOGGED_IN = gql`
//   query IsUserLoggedIn {
//     isLoggedIn @client
//   }
// `

// function IsLoggedIn() {
//   const { data } = useQuery(IS_LOGGED_IN)
//   return data.isLoggedIn ? <Pages /> : <Login />
// }

// export default () => <IsLoggedIn />
import React from 'react'
import Layout from '../components/layout'

export default () => (
  <Layout>
    <h1>Hello world!</h1>
  </Layout>
)
