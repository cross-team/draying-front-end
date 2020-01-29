import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {
  makeStyles,
  Typography,
  AppBar,
  Toolbar,
  Menu,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Button
} from '@material-ui/core/'
import DriverTripCard from '../driver-trip-card'
import Loading from '../../loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/pro-light-svg-icons/'

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
    color: theme.palette.primary.contrastText
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
    marginTop: theme.spacing(2)
  },
  dispatch: {
    width: '100%',
    backgroundColor: theme.palette.danger.main,
    color: theme.palette.danger.contrastText,
    marginTop: theme.spacing(2)
  }
}))

const TripPanel = ({ trip }) => {
  const classes = useStyles()
  const [action, setAction] = useState('')
  const [anchorEl, setAnchorEl] = useState(null)

  console.log('Draying ID: ', trip.draying.id)
  console.log('Trip ID: ', trip.id)
  const { loading, error, data } = useQuery(GET_ACTIONS, { variables: { drayingId: parseInt(trip.draying.id), tripId: parseInt(trip.id) } })

  if ( loading ) {
    return <Loading />
  }

  if ( error ) {
    console.log(error)
    return (
      <Typography color='danger'>
        {`Error: ${error}`}
      </Typography>
    )
  }

  const handleActionChange = event => {
    setAction(event.target.value);
  }

  const handleClick = event => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleClose = event => {
    setAnchorEl(null)
  }

  console.log(data.drayingNextActions.tripActions)

  return (
    <>
      <AppBar position='static'>
        <Toolbar className={classes.header}>
          <Typography className={classes.headerText}>Trip</Typography>
          <IconButton onClick={handleClick}>
            <FontAwesomeIcon className={classes.headerText} icon={faEllipsisV} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Edit Trip</MenuItem>
            <MenuItem onClick={handleClose}>Change Trip Action</MenuItem>
            <MenuItem onClick={handleClose}>Undo Trip Action</MenuItem>
            <MenuItem onClick={handleClose}>Add Leg</MenuItem>
            <MenuItem onClick={handleClose}>Lost Trip</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <div className={classes.details}>
        <FormControl className={classes.formControl}>
          <InputLabel>Available Trip Actions</InputLabel>
          <Select value={action} onChange={handleActionChange}>
            {data.drayingNextActions.tripActions.map((action) =>
              <MenuItem key={action.name}value={action.name}>{action.name}</MenuItem>            
            )}
          </Select>
        </FormControl>
        <DriverTripCard trip={trip} />
        { trip.status.id === '5' ? <Button className={classes.complete}>Complete Trip</Button> : 
          <Button className={classes.dispatch}>Dispatch Trip</Button>}
      </div>
    </>
  )
}

export default TripPanel