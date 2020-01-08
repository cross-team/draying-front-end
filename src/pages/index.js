import React from 'react'
import { Link } from 'gatsby'
import { isLoggedIn, getUser } from '../services/auth'
import Button from '@material-ui/core/Button'
import Layout from '../components/layout'

export default () => (
  <Layout>
    <h1>Hello {isLoggedIn() ? getUser().email : 'world'}!</h1>
    <p>
      {isLoggedIn() ? (
        <>
          You are logged in, check your
          <Link to="/app/profile">
            <Button variant="contained">profile</Button>
          </Link>
        </>
      ) : (
        <>
          You should
          <Link to="/app/login">
            <Button variant="contained">Log in</Button>
          </Link>
          to see restricted content
        </>
      )}
    </p>
  </Layout>
)
