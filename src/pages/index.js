import React, { useEffect } from 'react'
import { navigate } from 'gatsby'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Loading } from '../components'

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`

export default () => {
  const { data } = useQuery(IS_LOGGED_IN)
  const { isLoggedIn } = data
  useEffect(() => {
    if (isLoggedIn) {
      navigate(`/app/drivers`)
    }
    navigate(`/app/login`)
  }, [isLoggedIn])
  return (
    <>
      <Loading />
    </>
  )
}
