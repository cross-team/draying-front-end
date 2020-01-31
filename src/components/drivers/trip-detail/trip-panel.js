import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {
  makeStyles,
  Typography,
  AppBar,
  Toolbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@material-ui/core/'
import DriverTripCard from '../driver-trip-card'
import Loading from '../../loading'
import EditTripMenu from '../../menus/edit-trip-menu'

export const GET_ACTIONS = gql`
  query drayingNextActions($drayingId: Int, $tripId: Int) {
    drayingNextActions(drayingId: $drayingId, tripId: $tripId) {
      tripActions {
        name
      }
    }
  }
`

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
  formControl: {
    width: '100%',
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
  const [action, setAction] = useState('')

  const { loading, error, data } = useQuery(GET_ACTIONS, {
    variables: {
      drayingId: parseInt(trip.draying.id),
      tripId: parseInt(trip.id),
    },
  })

  if (loading) {
    return <Loading />
  }

  if (error) {
    console.log(error)
    return <Typography color="danger">{`Error: ${error}`}</Typography>
  }

  const handleActionChange = event => {
    setAction(event.target.value)
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar className={classes.header}>
          <Typography className={classes.headerText}>Trip</Typography>
          <EditTripMenu />
        </Toolbar>
      </AppBar>
      <div className={classes.details}>
        <FormControl className={classes.formControl}>
          <InputLabel>Available Trip Actions</InputLabel>
          <Select value={action} onChange={handleActionChange}>
            {data.drayingNextActions.tripActions.map(action => (
              <MenuItem key={action.name} value={action.name}>
                {action.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <DriverTripCard trip={trip} />
        {trip.status.id === '5' ? (
          <Button className={classes.complete}>Complete Trip</Button>
        ) : (
          <Button className={classes.dispatch}>Dispatch Trip</Button>
        )}
      </div>
    </>
  )
}

export default TripPanel
