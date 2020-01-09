import React from 'react'
import { useApolloClient, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { setUser, isLoggedIn } from '../../services/auth'
import { navigate } from 'gatsby'
import { LoginForm, Loading } from '..'

export const LOGIN_USER = gql`
  mutation login($user: LoginInput) {
    login(user: $user) {
      token
      email
    }
  }
`

export default function Login() {
  const client = useApolloClient()
  const [login, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted({ login: { token, email } }) {
      setUser({ token, email })
      client.writeData({ data: { isLoggedIn: true } })
      if (isLoggedIn()) {
        navigate(`/app/dispatch`)
      }
    },
  })
  if (isLoggedIn()) {
    navigate(`/app/dispatch`)
  }
  if (loading) return <>loading...</>
  if (error) return <p>An error occurred</p>

  return <LoginForm login={login} />
}
