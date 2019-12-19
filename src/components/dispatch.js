import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import DrayingCard from './draying-card'

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
  const drayings = data.drayings ? data.drayings.drayings || [] : []
  return (
    <>
      {drayings && drayings.length > 0
        ? drayings.map(draying => <DrayingCard draying={draying} />)
        : ''}
    </>
  )
}
