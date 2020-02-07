import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import Collapse from '@material-ui/core/Collapse'
import CardHeader from '@material-ui/core/CardHeader'
import {
  getLastTrip,
  drayingIsPreDispatched,
} from '../../../utils/draying-helpers'
import {
  tripIsCompletable,
  tripHasSequenceAction,
} from '../../../utils/trip-helpers'
import UpdateTripButton from './update-trip-button'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

const GET_NEXT_DESTINATIONS = gql`
  query getNextDestination(
    $drayingId: Int!
    $tripActionId: Int!
    $startLocationTypeId: Int!
  ) {
    drayingTripDestinations(
      drayingId: $drayingId
      tripActionId: $tripActionId
      startLocationTypeId: $startLocationTypeId
    ) {
      tripActionLocations {
        id
        hasSequenceAction
        name
      }
    }
  }
`

export default function SendMessageSection({
  handleClose,
  drayingId,
  tripActionId,
  startLocationTypeId,
  drayingTrip,
  draying,
}) {
  const [body, setBody] = useState('')
  const [sendMessage, setSendMessage] = useState(false)

  const { loading, error, data } = useQuery(GET_NEXT_DESTINATIONS, {
    variables: {
      drayingId: +drayingId,
      tripActionId: +tripActionId,
      startLocationTypeId: +startLocationTypeId,
    },
    fetchPolicy: 'cache-and-network',
  })

  if (loading && !data) {
    return <CircularProgress />
  }

  if (error) {
    return <Typography color="error">Error</Typography>
  }

  const { drayingTripDestinations } = data

  const hasTripToUpdate = typeof drayingTrip !== 'undefined'

  const showPredispatchCheckbox =
    drayingIsPreDispatched(draying) && !tripIsCompletable(drayingTrip)

  const showPredispatchButton =
    drayingIsPreDispatched(draying) && !tripIsCompletable(drayingTrip)

  const showDispatchButton =
    drayingIsPreDispatched(draying) &&
    hasTripToUpdate &&
    tripIsCompletable(drayingTrip)

  const showSaveButton =
    !drayingIsPreDispatched(draying) && !tripIsCompletable(drayingTrip)

  const showCompleteButton =
    !drayingIsPreDispatched(draying) &&
    tripIsCompletable(drayingTrip) &&
    hasTripToUpdate &&
    !tripHasSequenceAction(
      drayingTrip,
      drayingTripDestinations.tripActionLocations,
    )

  const showNextActionButton =
    !drayingIsPreDispatched(draying) &&
    hasTripToUpdate &&
    tripHasSequenceAction(
      drayingTrip,
      drayingTripDestinations.tripActionLocations,
    )

  const SendMessagePanel = ({ message }) => {
    return (
      <>
        <Collapse in={!sendMessage} timeout="auto" unmountOnExit>
          <Grid container spacing={2}>
            <Grid item>
              <Typography>Message:</Typography>
            </Grid>
            <Grid item>
              <TextareaAutosize
                aria-label="Send message text."
                rowsMin={3}
                placeholder={message.body}
                onChange={e => setBody(e.target.value)}
                value={body}
              />
            </Grid>
          </Grid>
        </Collapse>
      </>
    )
  }

  const EndLocationDropdown = ({ endLocations, onChange }) => {
    if (endLocations && endLocations.length > 0) {
      const menuItems = endLocations.map(item => (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      ))
      return (
        <TextField
          label="End Locations"
          // className={classes.textField}
          value={drayingTrip.tripActionLocation.id}
          select
          onChange={onChange}
          margin="normal"
          variant="outlined"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        >
          {menuItems}
        </TextField>
      )
    }
    return null
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <EndLocationDropdown
            endLocations={drayingTripDestinations.tripActionLocations}
          />
        </Grid>
      </Grid>

      <SendMessagePanel message={{ body: '' }} />
      {showPredispatchCheckbox && (
        <Typography color="textPrimary" gutterBottom>
          <FormControlLabel
            control={
              <Checkbox
                checked={sendMessage}
                onChange={e => setSendMessage(e.target.checked)}
                value="sendMessage"
                color="primary"
              />
            }
            label="Predispatch for tomorrow?"
          />
        </Typography>
      )}
      <CardActions>
        <>
          {showPredispatchButton && (
            <UpdateTripButton
              handleClose={handleClose}
              buttonText={
                tripIsCompletable(drayingTrip)
                  ? 'Update Predispatch'
                  : 'Predispatch'
              }
            />
          )}
          {showDispatchButton && (
            <UpdateTripButton handleClose={handleClose} buttonText="Dispatch" />
          )}
          {showSaveButton && (
            <UpdateTripButton handleClose={handleClose} buttonText="Save" />
          )}
          {showCompleteButton && (
            <UpdateTripButton handleClose={handleClose} buttonText="Complete" />
          )}

          {showNextActionButton && (
            <UpdateTripButton
              handleClose={handleClose}
              buttonText="Next Action"
            />
          )}
        </>

        <Button size="small" color="secondary" onClick={handleClose}>
          {'Cancel'}
        </Button>
      </CardActions>
    </>
  )
}
