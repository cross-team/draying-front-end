import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { makeStyles } from '@material-ui/core/'
import DriverHeader from './driver-header'
import DriverTripCard from './driver-trip-card'

// export const GET_DRIVER_TRIPS = gql``

export const GET_DISPATCH_STATE = gql`
  query getDispatchState {
    dispatchState @client {
      selectedDriver
    }
  }
`

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
  },
}))

export default function DriverTrip() {
  const classes = useStyles()
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

  return(
    <div className={classes.root}>
      { selectedDriver && (
        <>
          <DriverHeader selectedDriver={selectedDriver}/>
          <DriverTripCard />
        </>
      ) }
    </div>
  )
}
