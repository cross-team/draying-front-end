import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { makeStyles, Typography } from '@material-ui/core/'
import Loading from '../loading'
import DriverHeader from './driver-header'
import DriverTripCard from './driver-trip-card'

export const GET_DISPATCH_STATE = gql`
  query getDispatchState {
    dispatchState @client {
      selectedDriver
      selectedDate {
        day
        month
        year
      }
    }
  }
`

export const GET_ROUTES = gql`
  query allDriverRoutes($driverId: String) {
    routes: driverRoute(driverId: $driverId) {
      driver {
        firstName
        lastName
        phone
      }
      scheduledStartDateTime
      trips {
        locations {
          estimatedScheduledCompletedAt
          nickName {
            name
          }
          locationAction {
            id
            name
          }
        }
        driver {
          firstName
          lastName
        }
        action {
          name
        }
        status {
          name
          status
        }
        draying {
          id
          container
          deliveryLocation {
            nickName
          }
          containerSize {
            name
          }
          containerType {
            name
          }
          shippingLine {
            name
          }
          terminalLocation {
            nickName
          }
          returnTerminal {
            nickName
          }
        }
      }
    }
  }
`

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
  },
  dayText: {
    marginTop: theme.spacing(3),
  }
}))

export default function DriverTrip({ selectedDriver }) {
  const classes = useStyles()
  const { loading, error, data } = useQuery(GET_ROUTES, { variables: { driverId: selectedDriver } })

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

  console.log('Routes: ', data.routes)

  const getMonth = ( date ) => {
    let month = date.getMonth() + 1
    month = month.toString()
    if (month.length === 1) {
      month = "0" + month
    }

    return month
  }

  const getDay = ( date ) => {
    let day = date.getDate().toString()
    if (day.length === 1) {
      day = "0" + day
    }

    return day
  }

  const today = new Date(2020, 0, 15)
  const todayRegex = RegExp(`${today.getFullYear()}-${getMonth(today)}-${getDay(today)}`)
  const tripsToday = data.routes.map((route) => {
    if (todayRegex.test(route.scheduledStartDateTime)) {
      if (route.trips) {
        const trips = route.trips.map((trip) =>
          <DriverTripCard trip={trip} />
        )
        return trips
      }
      return <Typography>No trips for today.</Typography>
    }
  })

  return (
    <div className={classes.root}>
      <DriverHeader driver={data.routes[0].driver}/>
      <Typography variant='h5' className={classes.dayText}>Today</Typography>
      {tripsToday}
    </div>
  )
}
