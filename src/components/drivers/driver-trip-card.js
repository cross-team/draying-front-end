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
  actionContainer: {
    width: '100%',
    backgroundColor: theme.palette.danger.light,
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: theme.spacing(1),
  },
  statusContainer: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  tabText: {
    color: '#979797'
  }
}))

const DriverTripCard = ({ trip }) => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <div className={classes.container}>
        <div>
          <Typography>{`${trip.driver.firstName} ${trip.driver.lastName}`}</Typography>
          <Typography variant='caption'>{
            `${trip.draying.container} - ${trip.draying.containerSize.name}, ${trip.draying.containerType.name}`
          }</Typography>
        </div>
        <div className={classes.rightContainer}>
          <div className={classes.actionContainer}>
        <Typography className={classes.tabText}>{trip.action.name}</Typography>
          </div>
          <div className={classes.statusContainer}>
            <Typography className={classes.tabText}>{trip.status.name}</Typography>
          </div>
        </div>
      </div>
      <TripCard trip={trip} />
    </Card>
  )
}

export default DriverTripCard