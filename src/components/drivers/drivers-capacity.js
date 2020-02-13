import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/styles/makeStyles'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import CollapsedDriverCard from './collapsed-driver-card'
import FindAndSort from './find-and-sort'
import Skeleton from '@material-ui/lab/Skeleton'

export const GET_DISPATCH_STATE = gql`
  query getSelectedDate {
    dispatchState @client {
      selectedDate {
        day
        month
        year
      }
      sortDriversBy
      searchDrivers
    }
  }
`

export const GET_DRIVERS = gql`
  query allDriversCapacity(
    $first: Int
    $date: String
    $driverName: String
    $orderBy: OrderBy
  ) {
    drivers: driversCapacity(
      first: $first
      date: $date
      driverName: $driverName
      orderBy: $orderBy
    ) {
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

const useStyles = makeStyles(theme => ({
  card: {
    padding: theme.spacing(2),
    width: '275px',
  },
}))

export default function DriversCapacity() {
  const classes = useStyles()
  const {
    data: {
      dispatchState: { selectedDate, sortDriversBy, searchDrivers },
    },
  } = useQuery(GET_DISPATCH_STATE)
  const queryDate = `${selectedDate.month}/${selectedDate.day}/${selectedDate.year}`
  const { loading, error, data } = useQuery(GET_DRIVERS, {
    variables: {
      first: 25,
      date: queryDate,
      ...(searchDrivers !== '' && { driverName: searchDrivers }),
      orderBy: sortDriversBy,
    },
    pollInterval: 30000,
    fetchPolicy: 'cache-and-network',
  })

  if (loading && !data) {
    const driversSkeletonIds = [1, 2, 3, 4, 5, 6]
    return driversSkeletonIds.map(key => (
      <Card key={key}>
        <Grid container spacing={1} className={classes.card}>
          <Grid item>
            <Skeleton variant="circle" width={40} height={40} />
          </Grid>
          <Grid item>
            <Skeleton variant="text" width={180} />
            <Skeleton variant="text" width={90} />
          </Grid>
        </Grid>
      </Card>
    ))
  }

  if (error) {
    return <Typography color="danger">Error</Typography>
  }

  const driverCards = data.drivers.nodes.map(driver => (
    <CollapsedDriverCard key={driver.id} driver={driver} />
  ))

  return (
    <>
      <FindAndSort />
      {driverCards}
    </>
  )
}
