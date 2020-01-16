import React from 'react'
import {
  makeStyles,
  Card,
  Avatar,
  Typography,
  Chip
} from '@material-ui/core/'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/pro-light-svg-icons/'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  dataContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(1),
  },
  chipContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  margin: {
    margin: theme.spacing(1),
  },
  success: {
    backgroundColor: theme.palette.success
  },
  warning: {
    backgroundColor: theme.palette.warning
  },
  danger: {
    backgroundColor: theme.palette.danger
  }
}))

export const SET_DISPATCH_STATE = gql`
  mutation setDispatchState($selectedDriver: ID) {
    setDispatchState(selectedDriver: $selectedDriver) @client {
      selectedDriver
    }
  }
`

const CollapsedDriverCard = ({ driver }) => {
  const classes = useStyles()

  const [setDispatchState] = useMutation(SET_DISPATCH_STATE)

  const fullName = `${driver.firstName} ${driver.lastName}`
  const initials = `${driver.firstName[0].toUpperCase()}${driver.lastName[0].toUpperCase()}`
  const capacity = Math.round(100 - driver.capacity)
  let capacityColor
  if (capacity >= 67) {
    capacityColor = classes.success
  } else if (capacity >= 34) {
    capacityColor = classes.warning
  } else {
    capacityColor = classes.danger
  }

  let currentETA = 0
  let minutes = 0
  if (driver.trip !== null) {
    currentETA = new Date(driver.trip.currentDestination.estimatedScheduledCompletedAt)
    minutes = Math.round((currentETA.getTime() - Date.now())/60000)
  }

  return (
    <Card className={classes.root} onClick={() => setDispatchState({variables: { selectedDriver: driver.id }})}>
      <Avatar className={classes.margin}>{initials}</Avatar>
      <div className={classes.dataContainer}>
        <Typography>{fullName}</Typography>
        <div className={classes.chipContainer}>
          <Chip className={capacityColor} label={`${capacity}%`} />
          <div>
            { driver.trip && <Chip label={`${minutes} min`} /> }
            <Chip label={`${driver.pendingTripsCount} ${
              driver.pendingTripsCount === 1 ?
              'Trip' : 'Trips'
            }`} />
          </div>
        </div>
      </div>
      <FontAwesomeIcon icon={faAngleRight} className={classes.margin} />
    </Card>
  )
}

export default CollapsedDriverCard
