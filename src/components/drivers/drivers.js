import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import DriversCapacity from './drivers-capacity'
import DriverTrips from './driver-trips'
import TripDetail from './trip-detail/trip-detail'
import Shell from '../columns/shell'

export const GET_DISPATCH_STATE = gql`
  query getDispatchState {
    dispatchState @client {
      selectedDriver {
        id
      }
      selectedTrip {
        id
      }
    }
  }
`

export default function Drivers() {
  const { data: { dispatchState: { selectedDriver, selectedTrip } } } = useQuery(GET_DISPATCH_STATE)

  return (
    <Shell left={<DriversCapacity />} middle={ selectedDriver.id && <DriverTrips /> } right={ selectedTrip.id && <TripDetail /> } />
  )
}
