import React from 'react'
import {
  makeStyles,
  Typography,
  LinearProgress,
  Avatar
} from '@material-ui/core/'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  infoContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  margin: {
    margin: theme.spacing(1),
  },
  progressContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: theme.spacing(1),
  },
  progress: {
    width: '100%',
  },
  locationDots: {
    backgroundColor: theme.palette.danger.main,
    width: '12px',
    height: '12px'
  },
  tripText: {
    fontWeight: 'bold',
  },
  tripTextETA: {
    fontWeight: 'bold',
    color: theme.palette.danger.main,
  }
}))

const TripCard = ({ trip }) => {
  const classes = useStyles()

  let currentDestinationIndex

  for (const [index, location] of trip.locations.entries()) {
    console.log('Locations: ', trip.locations)
    console.log('Location: ', location)
    if (location.action.id >= 1 && location.action.id <= 6) {
      currentDestinationIndex = index + 1
      break
    }
  }

  let currentETA = 0
  let minutes = 0
  currentETA = new Date(trip.locations[currentDestinationIndex].estimatedScheduledCompletedAt)
  minutes = Math.round((currentETA.getTime() - Date.now())/60000)

  return (
    <div className={classes.root}>
      <div className={classes.infoContainer}>
        <Typography variant='caption'>{trip.draying.shippingLine.name}</Typography>
        <Typography variant='caption'>{trip.draying.deliveryLocation.nickName}</Typography>
      </div>
      <div className={classes.progressContainer}>
        <Avatar className={classes.locationDots} >{''}</Avatar>
        <LinearProgress className={classes.progress} variant='determinate' value={50} />
        <Avatar className={classes.locationDots} >{''}</Avatar>
      </div>
      <div className={classes.progressContainer}>
        <Typography variant='caption' className={classes.tripText}>{trip.draying.returnTerminal && trip.draying.returnTerminal.nickName}</Typography>
        <Typography variant='caption' className={classes.tripTextETA}>{`ETA ${minutes}min`}</Typography>
        <Typography variant='caption' className={classes.tripText}>{trip.draying.terminalLocation && trip.draying.terminalLocation.nickName}</Typography>
      </div>
    </div>
  )
}

export default TripCard