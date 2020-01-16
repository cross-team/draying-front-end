import React from 'react'
import {
  makeStyles,
  Card,
  Typography,
} from '@material-ui/core/'
import TripCard from './trip-card'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column'
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: theme.spacing(1),
  },
  margin: {
    margin: theme.spacing(1),
  },
  rightContainer: {
    width: '36%'
  },
  tbdContainer: {
    width: '100%',
    backgroundColor: theme.palette.danger.light,
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: theme.spacing(1),
  },
  tbdText: {
    color: theme.palette.danger.dark
  },
  statusContainer: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  statusText: {
    color: '#979797'
  }
}))

const DriverTripCard = () => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <div className={classes.container}>
        <div>
          <Typography>Driver Name</Typography>
          <Typography variant='caption'>Container # - Size, Type</Typography>
        </div>
        <div className={classes.rightContainer}>
          <div className={classes.tbdContainer}>
            <Typography className={classes.tbdText}>TBD</Typography>
          </div>
          <div className={classes.statusContainer}>
            <Typography className={classes.statusText}>Trip Status</Typography>
          </div>
        </div>
      </div>
      <TripCard />
    </Card>
  )
}

export default DriverTripCard