import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Typography } from '@material-ui/core/'
import Loading from '../loading'

export const GET_DRIVER_TRIPS = gql``

export default function DriverTrip() {
  const { loading, error, data } = useQuery(GET_DRIVER_TRIPS, { variables: {} })

  if ( loading ) {
    return <Loading />
  }

  if ( error ) {
    console.log(error)
    return (
      <Typography color='danger'>
        Error
      </Typography>
    )
  }

  console.log(data)

  return <></>
}
