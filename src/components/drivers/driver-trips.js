import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Typography } from '@material-ui/core/'
import Loading from '../loading'

// export const GET_DRIVER_TRIPS = gql``
export const GET_DISPATCH_STATE = gql`
  query getDispatchState {
    dispatchState @client {
      selectedDriver
    }
  }
`

export default function DriverTrip() {
  // const { loading, error, data } = useQuery(GET_DRIVER_TRIPS, { variables: {} })
  const { data: { dispatchState: { selectedDriver } } } = useQuery(GET_DISPATCH_STATE)

  {/* if ( loading ) {
    return <Loading />
  }

  if ( error ) {
    console.log(error)
    return (
      <Typography color='danger'>
        Error
      </Typography>
    )
  } */}

  return (
    <Typography variant='h1'>
      {selectedDriver}
    </Typography>
  )
}
