import React from 'react'
import {
  makeStyles,
  Card,
  Avatar,
  Typography,
  Chip
} from '@material-ui/core/'
import { ChevronRight } from '@material-ui/icons/'

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

const CollapsedDriverCard = ({ driver }) => {
  const classes = useStyles()
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
  console.log(currentETA)

  return (
    <Card className={classes.root}>
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
      <ChevronRight className={classes.margin} />
    </Card>
  )
}

export default CollapsedDriverCard
