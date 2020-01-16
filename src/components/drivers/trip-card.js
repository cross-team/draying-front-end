import React from 'react'
import {
  makeStyles,
  Typography,
  Stepper,
  Step,
  StepLabel
} from '@material-ui/core/'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  margin: {
    margin: theme.spacing(1),
  },
}))

const TripCard = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Typography variant='caption'>Shipping Line</Typography>
        <Typography variant='caption'>Client Name</Typography>
      </div>
      <Stepper activeStep={1} alternativeLabel>
        <Step>
          <StepLabel>Pickup Location</StepLabel>
        </Step>
        <Step>
          <StepLabel>Trip ETA</StepLabel>
        </Step>
        <Step>
          <StepLabel>Dropoff Location</StepLabel>
        </Step>
      </Stepper>
    </div>
  )
}

export default TripCard