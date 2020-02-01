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
      selectedDriver {
        id
      }
      selectedDate {
        day
        month
        year
      }
    }
  }
`

export const GET_ROUTES = gql`
  query allDriverRoutes(
    $driverId: String
    $fromDate: String
    $toDate: String
    $pending: Boolean
  ) {
    routes: driverRoute(
      driverId: $driverId
      fromDate: $fromDate
      toDate: $toDate
      pending: $pending
    ) {
      __typename
      scheduledStartDateTime
      trips {
        id
        __typename
        locations {
          __typename
          estimatedScheduledCompletedAt
          nickName {
            name
            __typename
          }
          action {
            id
            name
            __typename
          }
        }
        driver {
          __typename
          firstName
          lastName
        }
        action {
          __typename
          name
        }
        status {
          __typename
          name
          id
        }
        draying {
          __typename
          id
          container
          priority
          cutOffDate
          booking
          appointments {
            appointmentDate
            appointmentTime
            type {
              name
            }
          }
          extraStops {
            deliveryLocation {
              nickName
            }
          }
          deliveryLocation {
            __typename
            nickName
            locationType {
              id
              name
            }
          }
          portStatus {
            name
          }
          loadType {
            name
          }
          containerSize {
            __typename
            id
            name
          }
          containerType {
            __typename
            id
            name
          }
          shippingLine {
            __typename
            name
          }
          terminalLocation {
            __typename
            nickName
          }
          returnTerminal {
            __typename
            nickName
          }
          order {
            id
          }
          client {
            companyName
          }
          containerStage {
            id
          }
        }
      }
    }
  }
`

const addZero = value => {
  let newValue = value.toString()
  if (newValue.length === 1) {
    newValue = '0' + newValue
  }

  return newValue
}

const getMonthLength = (month, year) => {
  switch (month) {
    case 1:
      return 31
    case 2:
      if (year % 4 === 0) {
        return 29
      }
      return 28
    case 3:
      return 31
    case 4:
      return 30
    case 5:
      return 31
    case 6:
      return 30
    case 7:
      return 31
    case 8:
      return 31
    case 9:
      return 30
    case 10:
      return 31
    case 11:
      return 30
    case 12:
      return 31
    default:
      break
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
  },
  dayText: {
    marginTop: theme.spacing(3),
  },
}))

export default function DriverTrips() {
  const classes = useStyles()
  const {
    data: {
      dispatchState: { selectedDriver, selectedDate },
    },
  } = useQuery(GET_DISPATCH_STATE)

  const getToday = () => {
    const today = { ...selectedDate }
    return `${today.year}-${addZero(today.month)}-${addZero(today.day)}`
  }

  const getTomorrow = () => {
    const today = { ...selectedDate }
    const tomorrow = today
    if (today.day === getMonthLength(today.month, today.year)) {
      tomorrow.day = 1
      if (today.month === 12) {
        tomorrow.month = 1
        tomorrow.year = today.year + 1
      } else {
        tomorrow.month = today.month + 1
      }
    } else {
      tomorrow.day = today.day + 1
    }

    return `${tomorrow.year}-${addZero(tomorrow.month)}-${addZero(
      tomorrow.day,
    )}`
  }
  const todayStr = getToday() + 'T00:00:00-05:00'
  const tomorrowStr = getTomorrow() + 'T23:59:59-05:00'

  const { loading, error, data } = useQuery(GET_ROUTES, {
    variables: {
      driverId: selectedDriver.id,
      pending: false,
      fromDate: todayStr,
      toDate: tomorrowStr,
    },
    fetchPolicy: 'cache-and-network',
  })

  if (loading && !data) {
    return <Loading />
  }

  if (error) {
    console.log(error)
    return <Typography color="danger">Error</Typography>
  }

  console.log('Routes: ', data.routes)

  const todayRegex = new RegExp(getToday())
  let tripsToday
  // const tomorrowRegex = new RegExp(getTomorrow())
  let tripsTomorrow

  switch (data.routes.length) {
    case 0:
      tripsToday = <Typography>No trips for today.</Typography>
      tripsTomorrow = <Typography>No trips for tomorrow.</Typography>
      break
    case 1:
      if (todayRegex.test(data.routes[0].scheduledStartDateTime)) {
        tripsToday = data.routes[0].trips.map(trip => (
          <DriverTripCard trip={trip} />
        ))
        tripsTomorrow = <Typography>No trips for tomorrow.</Typography>
      } else {
        tripsToday = <Typography>No trips for today.</Typography>
        tripsTomorrow = data.routes[0].trips.map(trip => (
          <DriverTripCard trip={trip} />
        ))
      }
      break
    case 2:
      tripsToday = data.routes[0].trips.map(trip => (
        <DriverTripCard trip={trip} />
      ))
      tripsTomorrow = data.routes[1].trips.map(trip => (
        <DriverTripCard trip={trip} />
      ))
      break
    default:
      break
  }

  return (
    <div className={classes.root}>
      <DriverHeader />
      <Typography variant="h5" className={classes.dayText}>
        Today
      </Typography>
      {tripsToday && tripsToday}
      <Typography variant="h5" className={classes.dayText}>
        Tomorrow
      </Typography>
      {tripsTomorrow && tripsTomorrow}
    </div>
  )
}
