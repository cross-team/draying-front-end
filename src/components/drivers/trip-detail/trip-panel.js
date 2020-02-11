import React from 'react'
import {
  makeStyles,
  Typography,
  AppBar,
  Toolbar,
  Button,
} from '@material-ui/core/'
import DriverTripCard from '../driver-trip-card'
import EditTripMenu from '../../menus/edit-trip-menu'
import ChangeTripActionPopUp from '../../modals/change-trip-action/index'

const useStyles = makeStyles(theme => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    color: theme.palette.primary.contrastText,
  },
  details: {
    margin: theme.spacing(1),
  },
  complete: {
    width: '100%',
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
    marginTop: theme.spacing(2),
  },
  dispatch: {
    width: '100%',
    backgroundColor: theme.palette.danger.main,
    color: theme.palette.danger.contrastText,
    marginTop: theme.spacing(2),
  },
}))

const TripPanel = ({ trip }) => {
  const classes = useStyles()
  return (
    <>
      <AppBar position="static">
        <Toolbar className={classes.header}>
          <Typography className={classes.headerText}>Trip</Typography>
          <EditTripMenu
            drayingId={trip.draying.id}
            tripId={trip.id}
            trip={trip}
          />
        </Toolbar>
      </AppBar>
      <div className={classes.details}>
        <DriverTripCard trip={trip} />
        {trip.status.id === '5' && (
          <ChangeTripActionPopUp
            drayingId={trip.draying.id}
            tripId={trip.id}
            Component={Button}
            className={classes.complete}
            buttonText={'Complete Trip'}
            isCompletable={true}
          />
        )}
        {trip.status.id === '4' && (
          <ChangeTripActionPopUp
            tripId={trip.id}
            drayingId={trip.draying.id}
            Component={Button}
            className={classes.dispatch}
            buttonText={'Dispatch Trip'}
            isCompletable={true}
          />
        )}
      </div>
    </>
  )
}

export default TripPanel
