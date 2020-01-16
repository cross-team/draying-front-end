import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Typography } from '@material-ui/core/'
import Loading from '../loading'
import CollapsedDriverCard from './collapsed-driver-card'

export const GET_DRIVERS = gql`
  query allDriversCapacity($first: Int, $date: String) {
    drivers: driversCapacity(first: $first, date: $date) {
      nodes {
        id
        firstName
        lastName
        capacity
        pendingTripsCount
        trip {
          currentDestination {
            estimatedScheduledCompletedAt
          }
        }
      }
    }
  }
`

export default function DriversCapacity() {
  const today = new Date(2020, 0, 15)
  const date = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`
  const { loading, error, data } = useQuery(GET_DRIVERS, { variables: { first: 25, date: date } })

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

  console.log(data.drivers)

  const driverCards = data.drivers.nodes.map((driver) =>
    <CollapsedDriverCard driver={driver} />
  )

  return driverCards
}
