import React, { useState } from 'react'
import { useApolloClient, useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Grid from '@material-ui/core/Grid'
import { setUser } from '../../services/auth'
import { navigate } from 'gatsby'
import { LoginForm } from '..'
import makeStyles from '@material-ui/styles/makeStyles'
import Loading from '../loading'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
}))

export const LOGIN_USER = gql`
  mutation login($user: LoginInput) {
    login(user: $user) {
      success
      token
      email
      message
    }
  }
`

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`

export default function Login() {
  const client = useApolloClient()
  const classes = useStyles()
  const [userMessage, setUserMessage] = useState('')
  const {
    data: { isLoggedIn },
  } = useQuery(IS_LOGGED_IN)
  const [login, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted({ login: { token, email, message } }) {
      setUser({ token, email })
      client.writeData({ data: { isLoggedIn: true } })
      navigate(`/app/drivers`)
      setUserMessage(message)
    },
  })
  if (isLoggedIn) {
    navigate(`/app/drivers`)
  }
  if (loading) return <Loading />
  if (error) return <p>{`An error occurred ${userMessage}`}</p>

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <LoginForm login={login} />
    </Grid>
  )
}
