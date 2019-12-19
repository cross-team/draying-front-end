import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

export const GET_ALL_DRAYINGS = gql`
  query GetAllDrayings {
    drayings {
      cursor
      hasMore
      drayings {
        id
        order {
          id
        }
      }
    }
  }
`
export default function Dispatch() {
  const { data, loading, error } = useQuery(GET_ALL_DRAYINGS)
  if (loading) return <>Loading...</>
  if (error) return <p>ERROR: {error.message}</p>
  return (
    <>
      <pre>{JSON.stringify(data.drayings, null, 2)}</pre>
    </>
  )
}
