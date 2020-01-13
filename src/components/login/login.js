import React, { useState } from 'react'
import { useApolloClient, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { setUser, isLoggedIn } from '../../services/auth'
import { navigate } from 'gatsby'
import { LoginForm, Loading } from '..'

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

export default function Login() {
  const client = useApolloClient()
  const [userMessage, setUserMessage] = useState('')
  const [login, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted({ login: { token, email, success, message } }) {
      if (success) {
        setUser({ token, email })
        client.writeData({ data: { isLoggedIn: true } })
        navigate(`/app/dispatch`)
      }
      setUserMessage(message)
    },
  })
  if (isLoggedIn()) {
    navigate(`/app/dispatch`)
  }
  if (loading) return <>loading...</>
  if (error) return <p>{`An error occurred ${userMessage}`}</p>

  return <LoginForm login={login} />
}
