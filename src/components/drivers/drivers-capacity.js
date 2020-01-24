import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Typography } from '@material-ui/core/'
import Loading from '../loading'
import CollapsedDriverCard from './collapsed-driver-card'
import FindAndSort from './find-and-sort'

export const GET_DISPATCH_STATE = gql`
  query getDispatchState {
    dispatchState @client {
      selectedDate {
        day
        month
        year
      }
    }
  }
`

export const GET_DRIVERS = gql`
  query allDriversCapacity($first: Int, $date: String) {
    drivers: driversCapacity(first: $first, date: $date) {
      nodes {
        id
        firstName
        lastName
        phone
        capacityInfo {
          pendingTripsCount
          capacity
          activeTripCapacity {
            currentDestination {
              estimatedScheduledCompletedAt
            }
          }
        }
      }
    }
  }
`

export default function DriversCapacity() {
  const { data: { dispatchState: { selectedDate } } } = useQuery(GET_DISPATCH_STATE)
  const queryDate = `${selectedDate.month}/${selectedDate.day}/${selectedDate.year}`
  const { loading, error, data } = useQuery(GET_DRIVERS, { variables: { first: 25, date: queryDate } })

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

  const driverCards = data.drivers.nodes.map((driver) =>
    <CollapsedDriverCard driver={driver} />
  )

  return (
    <>
      <FindAndSort />
      {driverCards}
    </>
  )
}
