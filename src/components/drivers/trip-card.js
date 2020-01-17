import React from 'react'
import {
  makeStyles,
  Typography,
  LinearProgress,
  Avatar,
  Stepper,
  Step,
  StepLabel
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

const TripCard = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.infoContainer}>
        <Typography variant='caption'>Shipping Line</Typography>
        <Typography variant='caption'>DeliverLocation</Typography>
      </div>
      <div className={classes.progressContainer}>
        <Avatar className={classes.locationDots} >{''}</Avatar>
        <LinearProgress className={classes.progress} variant='determinate' value={50} />
        <Avatar className={classes.locationDots} >{''}</Avatar>
      </div>
      <div className={classes.progressContainer}>
        <Typography variant='caption' className={classes.tripText}>Terminal Loc</Typography>
        <Typography variant='caption' className={classes.tripTextETA}>Trip Est Time</Typography>
        <Typography variant='caption' className={classes.tripText}>Delivery Loc #</Typography>
      </div>
      {/* <Stepper activeStep={1} alternativeLabel>
        <Step>
          <StepLabel>Pickup Location</StepLabel>
        </Step>
        <Step>
          <StepLabel>Trip ETA</StepLabel>
        </Step>
        <Step>
          <StepLabel>Dropoff Location</StepLabel>
        </Step>
  </Stepper> */}
    </div>
  )
}

export default TripCard