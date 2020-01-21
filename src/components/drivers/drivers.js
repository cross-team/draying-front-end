import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import DriversCapacity from './drivers-capacity'
import DriverTrips from './driver-trips'
import Shell from '../columns/shell'

export const GET_DISPATCH_STATE = gql`
  query getDispatchState {
    dispatchState @client {
      selectedDriver
    }
  }
`

export default function Drivers() {
  const { data: { dispatchState: { selectedDriver } } } = useQuery(GET_DISPATCH_STATE)

  return (
    <Shell left={<DriversCapacity />} middle={ selectedDriver && <DriverTrips selectedDriver={selectedDriver} /> } />
  )
}
