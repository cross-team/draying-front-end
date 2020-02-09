import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { makeStyles, Typography } from '@material-ui/core/'
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
import Skeleton from '@material-ui/lab/Skeleton'

export const GET_DISPATCH_STATE = gql`
  query getSelectedDriverAndDate {
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
      id
      scheduledStartDateTime
      trips {
        id
        __typename
        locations {
          id
          __typename
          estimatedScheduledCompletedAt
          nickName {
            id
            __typename
            name
          }
          action {
            id
            __typename
            name
          }
        }
        driver {
          id
          __typename
          firstName
          lastName
        }
        action {
          id
          __typename
          name
        }
        status {
          id
          __typename
          name
        }
        draying {
          id
          __typename
          container
          priority
          cutOffDate
          booking
          appointments {
            id
            __typename
            appointmentDate
            appointmentTime
            type {
              id
              __typename
              name
            }
          }
          extraStops {
            id
            __typename
            deliveryLocation {
              id
              __typename
              nickName
            }
          }
          deliveryLocation {
            id
            __typename
            id
            nickName
            locationType {
              id
              name
            }
          }
          portStatus {
            id
            __typename
            name
          }
          loadType {
            id
            __typename
            name
          }
          containerSize {
            id
            __typename
            name
          }
          containerType {
            id
            __typename
            name
          }
          shippingLine {
            id
            __typename
            name
          }
          terminalLocation {
            id
            __typename
            nickName
          }
          returnTerminal {
            id
            __typename
            id
            nickName
          }
          order {
            id
            __typename
          }
          client {
            id
            __typename
            companyName
          }
          containerStage {
            id
            __typename
          }
          trips {
            id
            __typename
            status {
              id
              __typename
            }
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
  trip: {
    '&:hover': {
      cursor: 'pointer',
    },
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

  const { loading, error, data: getRoutesData } = useQuery(GET_ROUTES, {
    variables: {
      driverId: selectedDriver.id,
      pending: true,
      fromDate: todayStr,
      toDate: tomorrowStr,
    },
    fetchPolicy: 'cache-and-network',
    pollInterval: 30000,
  })
  const [currentData, setCurrentData] = useState(null)
  useEffect(() => {
    setCurrentData(null)
  }, [selectedDriver.id])

  useEffect(() => {
    if (getRoutesData) {
      setCurrentData(getRoutesData)
    }
  }, [getRoutesData])

  const data = currentData

  if (error) {
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
        <div key={route.id}>
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
          <Grid container spacing={1} direction="column">
            {route.trips.map(trip => (
              <Grid key={trip.id} item className={classes.trip}>
                <DriverTripCard trip={trip} />
              </Grid>
            ))}
          </Grid>
        </div>
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

  const loadingRouteSkeleton = (
    <Grid
      container
      justify="space-between"
      spacing={2}
      className={classes.routeHeader}
    >
      <Grid item>
        <Typography variant="h5" className={classes.dayText}>
          <Skeleton variant="text" width={180} />
        </Typography>
      </Grid>
      <Skeleton variant="circle" width={40} height={40} />
    </Grid>
  )
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
      ) : (
        loading &&
        !data && (
          <Grid container spacing={2} direction="column">
            <Grid item>
              <DriverHeader />
            </Grid>
            <Grid item>{loadingRouteSkeleton}</Grid>
            <Grid item>{loadingRouteSkeleton}</Grid>
          </Grid>
        )
      )}
      NO DATA
    </div>
  )
}
