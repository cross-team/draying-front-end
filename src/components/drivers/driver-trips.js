import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { makeStyles, Typography } from '@material-ui/core/'
import Loading from '../loading'
import DriverHeader from './driver-header'
import DriverTripCard from './driver-trip-card'
import differenceInDays from 'date-fns/differenceInDays'
import parseISO from 'date-fns/parseISO'
import format from 'date-fns/format'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import AddTripButton from './add-trip-button'
import addDays from 'date-fns/addDays'
import formatISO from 'date-fns/formatISO'

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

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
  },
  dayText: {
    marginTop: theme.spacing(3),
  },
  routeHeader: {
    padding: theme.spacing(2),
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
    return new Date(today.year, today.month - 1, today.day)
  }

  const getTomorrow = () => {
    const tomorrow = addDays(getToday(), 1)
    return tomorrow
  }

  const todayStr = formatISO(getToday())
  const tomorrowStr = formatISO(getTomorrow())

  const { loading, error, data } = useQuery(GET_ROUTES, {
    variables: {
      driverId: selectedDriver.id,
      pending: true,
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

  const dayLabel = date => {
    const daysDifference = differenceInDays(parseISO(date), new Date())
    switch (daysDifference) {
      case -1:
        return 'Yesterday'
      case 0:
        return 'Today'
      case 1:
        return 'Tomorrow'
      default:
        return format(parseISO(date), 'MM/dd/yyyy')
    }
  }

  const renderRoutesTrips = (routes, dayText) => {
    const hasNoRoutesCanAddTrip =
      routes.length === 0 && typeof dayText !== 'undefined'
    if (hasNoRoutesCanAddTrip) {
      return (
        <>
          <Grid
            container
            justify="space-between"
            spacing={2}
            className={classes.routeHeader}
          >
            <Grid item>
              <Typography variant="h5" className={classes.dayText}>
                {dayText}
              </Typography>
            </Grid>
            <AddTripButton />
          </Grid>
        </>
      )
    }
    return routes.map(route => {
      return (
        <>
          <Grid
            container
            justify="space-between"
            spacing={2}
            className={classes.routeHeader}
          >
            <Grid item>
              <Typography variant="h5" className={classes.dayText}>
                {dayLabel(route.scheduledStartDateTime)}
              </Typography>
            </Grid>
            <AddTripButton />
          </Grid>
          {route.trips.map(trip => (
            <DriverTripCard trip={trip} />
          ))}
        </>
      )
    })
  }

  const filterRoutesByDaysDiff = (routes, diff) =>
    routes.filter(
      route =>
        differenceInDays(parseISO(route.scheduledStartDateTime), new Date()) ===
        diff,
    )

  const earlierRoutes = routes =>
    routes.filter(
      route =>
        differenceInDays(parseISO(route.scheduledStartDateTime), new Date()) <
        -1,
    )
  const yesterdaysRoute = routes => filterRoutesByDaysDiff(routes, -1)
  const todaysRoute = routes => filterRoutesByDaysDiff(routes, 0)
  const tomorrowsRoute = routes => filterRoutesByDaysDiff(routes, 1)

  return (
    <div className={classes.root}>
      {data && data.routes ? (
        <Grid container spacing={2} direction="column">
          <Grid item>
            <DriverHeader />
          </Grid>
          <Grid item>
            <Card>{renderRoutesTrips(earlierRoutes(data.routes))}</Card>
          </Grid>
          <Grid item>
            <Card>{renderRoutesTrips(yesterdaysRoute(data.routes))}</Card>
          </Grid>
          <Grid item>
            <Card>{renderRoutesTrips(todaysRoute(data.routes), 'Today')}</Card>
          </Grid>
          <Grid item>
            <Card>
              {renderRoutesTrips(tomorrowsRoute(data.routes), 'Tomorrow')}
            </Card>
          </Grid>
        </Grid>
      ) : null}
    </div>
  )
}
