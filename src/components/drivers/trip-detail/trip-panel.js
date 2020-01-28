import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {
  makeStyles,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core/'
import DriverTripCard from '../driver-trip-card'
import Loading from '../../loading'

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
  summary: {
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  summaryPanel: {
    backgroundColor: theme.palette.primary.main,
  },
  summaryText: {
    color: theme.palette.primary.contrastText
  },
  details: {
    width: '100%'
  },
  formControl: {
    width: '100%',
  }
}))

const TripPanel = ({ trip }) => {
  const classes = useStyles()
  const [action, setAction] = useState('')

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

  console.log(data.drayingNextActions.tripActions)

  return (
    <ExpansionPanel defaultExpanded={true}>
      <ExpansionPanelSummary className={classes.summaryPanel}> 
        <div className={classes.summary}>
          <Typography className={classes.summaryText}>Trip</Typography>
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
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
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default TripPanel