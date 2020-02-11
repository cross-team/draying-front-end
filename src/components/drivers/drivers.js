import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import DriversCapacity from './drivers-capacity'
import DriverTrips from './driver-trips'
import TripDetail from './trip-detail/trip-detail'
import Shell from '../columns/shell'
import Grow from '@material-ui/core/Grow'
import Grid from '@material-ui/core/Grid'

export const GET_DISPATCH_STATE = gql`
  query getSelectedDriverAndTrip {
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
  const {
    data: {
      dispatchState: { selectedDriver, selectedTrip },
    },
  } = useQuery(GET_DISPATCH_STATE)
  const showMiddleColumn = selectedDriver.id !== ''
  const middle = (
    <>
      <Grow in={showMiddleColumn}>
        <Grid>{showMiddleColumn && <DriverTrips />}</Grid>
      </Grow>
    </>
  )
  const showRightColumn = selectedTrip.id !== ''
  const right = (
    <>
      <Grow in={showRightColumn}>
        {}
        <Grid>{showRightColumn && <TripDetail />}</Grid>
      </Grow>
    </>
  )

  return <Shell left={<DriversCapacity />} middle={middle} right={right} />
}
