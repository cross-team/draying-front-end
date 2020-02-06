import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { makeStyles } from '@material-ui/core/styles'
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
import { tripIsCompletable } from '../../../utils/trip-helpers'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

const useStyles = makeStyles({
  title: {
    fontSize: 14,
  },
})

const DRAYING_QUERY = gql`
  query drayingInfo($drayingId: Int!, $tripId: Int!) {
    draying(drayingId: $drayingId) {
      id
      __typename
      trips {
        __typename
        id
        status {
          id
          __typename
          name
        }
        action {
          id
          __typename
        }
        startLocationType {
          __typename
          name
        }
        endLocationType {
          __typename
          name
        }
      }
      booking
      container
      client {
        id
        __typename
        companyName
      }
      order {
        id
        __typename
      }
      terminalLocation {
        id
        __typename
      }
    }
    drayingNextActions(drayingId: $drayingId, tripId: $tripId) {
      tripActions {
        id
        __typename
        name
      }
      startLocationTypes {
        id
        __typename
        name
      }
      drayingTrip {
        id
        __typename
        status {
          id
        }
      }
    }
    currentTrip(tripId: $tripId) @client {
      id
      __typename
      action {
        id
        __typename
      }
      driver {
        id
        __typename
      }
      status {
        id
        __typename
      }
    }
    drivers(first: 25, active: true) {
      nodes {
        id
        __typename
        firstName
        lastName
      }
    }
  }
`

const UNDO_TRIP_MUTATION = gql`
  mutation undoTripActionMutation(
    $drayingId: Int
    $sendMessage: Boolean
    $body: String
  ) {
    undoDrayingTripAction(
      drayingId: $drayingId
      sendMessage: $sendMessage
      body: $body
    ) {
      success
      message
      updatedId
    }
  }
`

export default function ChangeTripActionContent({
  handleClose,
  drayingId,
  tripId,
}) {
  const classes = useStyles()
  const [body, setBody] = useState('')
  const [sendMessage, setSendMessage] = useState(false)

  const { loading, error, data } = useQuery(DRAYING_QUERY, {
    variables: { drayingId, ...(tripId && { tripId }) },
    fetchPolicy: 'cache-and-network',
  })

  const [
    callUndoTripAction,
    { data: changeResponse, loading: saving, error: errorSaving },
  ] = useMutation(UNDO_TRIP_MUTATION, {
    variables: { drayingId },
    refetchQueries: ['allDriversCapacity', 'allDriverRoutes'],
    onCompleted: () => handleClose(),
  })

  if (loading && !data) {
    return <Typography>Loading...</Typography>
  }

  if (error) {
    return <Typography color="error">Error</Typography>
  }
  if (data && !data.draying) {
    return null
  }

  if (saving && !changeResponse) {
    return (
      <CardContent>
        <CircularProgress />
      </CardContent>
    )
  }

  if (errorSaving) {
    return (
      <CardContent>
        <Typography color="danger">Error Saving</Typography>
      </CardContent>
    )
  }

  const handleUndoTripAction = () => {
    callUndoTripAction({
      variables: {
        sendMessage,
        body,
      },
    })
  }

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

  const { draying, currentTrip, drayingNextActions, drivers } = data

  const { drayingTrip } = drayingNextActions

  const ActionDropDown = ({ actions, onChange }) => {
    if (actions.length > 1) {
      const menuItems = actions.map(item => (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      ))
      return (
        <TextField
          label="Trip Action"
          // className={classes.textField}
          value={currentTrip.action.id}
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

  const DriverDropDown = ({ activeDrivers, onChange }) => {
    if (activeDrivers && activeDrivers.nodes.length > 1) {
      const menuItems = activeDrivers.nodes.map(item => (
        <MenuItem key={item.id} value={item.id}>
          {item.firstName} {item.lastName}
        </MenuItem>
      ))
      return (
        <TextField
          label="Driver"
          // className={classes.textField}
          value={currentTrip.driver.id}
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

  const ActionsDropDowns = () => {
    return (
      <Grid container>
        <Grid item xs={12} sm={6}>
          <ActionDropDown actions={drayingNextActions.tripActions} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DriverDropDown activeDrivers={drivers} />
        </Grid>
      </Grid>
    )
  }
  const headerText = `Trip (${draying.trips.length}) | ${draying.order.id} ${
    draying.client.companyName
  } | ${draying.container} ${
    draying.booking !== null ? '/' + draying.booking : ''
  } | ${draying.terminalLocation.id}`

  const fromOrCurrentLocationLabel =
    +getLastTrip(draying).status.id === 5 ? 'From: ' : 'Current Location: '

  const fromOrCurrentLocation =
    +getLastTrip(draying).status.id === 5
      ? getLastTrip(draying).startLocationType.name
      : getLastTrip(draying).endLocationType.name

  const displaySkipInMovement =
    !drayingIsPreDispatched(draying) && +currentTrip.action.id !== 14

  const showDispatchButton =
    drayingIsPreDispatched(draying) && typeof drayingTrip !== 'undefined'

  return (
    <>
      <CardContent>
        <CardHeader title={headerText}></CardHeader>
        <Typography className={classes.title} color="textPrimary" gutterBottom>
          {fromOrCurrentLocationLabel}
          {fromOrCurrentLocation}
        </Typography>
        {displaySkipInMovement && (
          <Typography
            className={classes.title}
            color="textPrimary"
            gutterBottom
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={sendMessage}
                  onChange={e => setSendMessage(e.target.checked)}
                  value="sendMessage"
                  color="primary"
                />
              }
              label="Skip in movement?"
            />
          </Typography>
        )}
        <ActionsDropDowns />
        <SendMessagePanel message={{ body: '' }} />
        <CardActions>
          {!saving && !changeResponse ? (
            showDispatchButton && (
              <Button size="small" onClick={handleUndoTripAction}>
                Dispatch
              </Button>
            )
          ) : (
            <Typography
              className={classes.title}
              color="textPrimary"
              gutterBottom
            >
              Success!
            </Typography>
          )}
          <Button size="small" color="secondary" onClick={handleClose}>
            {changeResponse ? 'Close' : 'Cancel'}
          </Button>
        </CardActions>
      </CardContent>
    </>
  )
}
