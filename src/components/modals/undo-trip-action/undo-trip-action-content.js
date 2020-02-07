import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { makeStyles, useTheme } from '@material-ui/core/styles'
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

import useMediaQuery from '@material-ui/core/useMediaQuery'

const useStyles = makeStyles({
  title: {
    fontSize: 14,
  },
})

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

const CAN_UNDO_TRIP_QUERY = gql`
  query CanUndo($drayingId: Int) {
    drayingGetUndoTripActionMessage(drayingId: $drayingId) {
      driverId
      tripStatusId
      drayingId
      tripMessages {
        id
        body
      }
    }
  }
`

export const CLOSE_PANEL = gql`
  mutation closePanel(
    $hideLeft: Boolean
    $hideMiddle: Boolean
    $hideRight: Boolean
    $selectedTrip: SelectedTripInput
  ) {
    setColumnState(
      hideLeft: $hideLeft
      hideMiddle: $hideMiddle
      hideRight: $hideRight
    ) @client {
      leftHidden
      middleHidden
      rightHidden
    }

    setDispatchState(selectedTrip: $selectedTrip) @client {
      selectedTrip {
        id
      }
    }
  }
`

export default function UndoTripActionContent({
  handleClose: closeModal,
  drayingId,
}) {
  const classes = useStyles()
  const [body, setBody] = useState('')
  const [sendMessage, setSendMessage] = useState(true)

  const [closeTripPanel] = useMutation(CLOSE_PANEL)
  const theme = useTheme()
  const isBigScreen = useMediaQuery(theme.breakpoints.up('sm'))

  const { loading, error, data } = useQuery(CAN_UNDO_TRIP_QUERY, {
    variables: { drayingId },
    fetchPolicy: 'cache-and-network',
  })

  const closePanel = () => {
    closeModal()
    if (!isBigScreen) {
      closeTripPanel({
        variables: {
          hideLeft: true,
          hideMiddle: false,
          hideRight: true,
          selectedTrip: { id: '' },
        },
      })
    } else {
      closeTripPanel({
        variables: {
          hideLeft: false,
          hideMiddle: false,
          hideRight: true,
          selectedTrip: { id: '' },
        },
      })
    }
  }
  const [
    callUndoTripAction,
    { data: undoResponse, loading: saving, error: errorSaving },
  ] = useMutation(UNDO_TRIP_MUTATION, {
    variables: { drayingId },
    refetchQueries: ['allDriversCapacity', 'allDriverRoutes', 'currentTrip'],
    awaitRefetchQueries: true,
    onCompleted: () => closePanel(),
  })

  if (loading && !data) {
    return <Typography>Loading...</Typography>
  }

  if (error) {
    return <Typography color="error">Error</Typography>
  }
  if (
    data.drayingGetUndoTripActionMessage &&
    !data.drayingGetUndoTripActionMessage.tripMessages
  ) {
    return null
  }

  if (saving && !undoResponse) {
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
        <Typography className={classes.title} color="textPrimary" gutterBottom>
          <FormControlLabel
            control={
              <Checkbox
                checked={sendMessage}
                onChange={e => setSendMessage(e.target.checked)}
                value="sendMessage"
                color="primary"
              />
            }
            label="Send Message?"
          />
        </Typography>
        <Collapse in={sendMessage} timeout="auto" unmountOnExit>
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

  return (
    <>
      <CardContent>
        <Typography className={classes.title} color="textPrimary" gutterBottom>
          Are you sure you want to undo the previous trip action?
        </Typography>
        {data.drayingGetUndoTripActionMessage.tripMessages.length > 0 ? (
          data.drayingGetUndoTripActionMessage.tripMessages.map(message => (
            <SendMessagePanel key={message.id} message={message} />
          ))
        ) : (
          <SendMessagePanel message={{ body: '' }} />
        )}
        <CardActions>
          {!saving && !undoResponse ? (
            <Button size="small" onClick={handleUndoTripAction}>
              Yes
            </Button>
          ) : (
            <Typography
              className={classes.title}
              color="textPrimary"
              gutterBottom
            >
              Success!
            </Typography>
          )}
          <Button size="small" color="secondary" onClick={closeModal}>
            {undoResponse ? 'Close' : 'Cancel'}
          </Button>
        </CardActions>
      </CardContent>
    </>
  )
}
