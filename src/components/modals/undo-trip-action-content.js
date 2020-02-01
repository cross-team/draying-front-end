import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Loading from '../loading'
import Button from '@material-ui/core/Button'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import { GET_DRIVERS } from '../drivers/drivers-capacity'
import {} from '../drivers/trip-detail/trip-detail'

const useStyles = makeStyles({
  title: {
    fontSize: 14,
  },
})

const UNDO_TRIP_MUTATION = gql`
  mutation undoTripActionMutation($drayingId: Int) {
    undoDrayingTripAction(drayingId: $drayingId) {
      success
      message
      updatedId
    }
  }
`

export default function UndoTripActionContent({
  handleClose,
  drayingId,
  canUndo,
}) {
  const classes = useStyles()

  const [
    callUndoTripAction,
    { data: undoResponse, loading: saving, error: errorSaving },
  ] = useMutation(UNDO_TRIP_MUTATION, {
    variables: { drayingId },
    refetchQueries: [GET_DRIVERS],
    // onCompleted: () => closeOrDisplayError(),
  })

  if (saving && !undoResponse) {
    return (
      <CardContent>
        <Loading />
      </CardContent>
    )
  }

  if (errorSaving) {
    console.log(errorSaving)
    return (
      <CardContent>
        <Typography color="danger">Error Saving</Typography>
      </CardContent>
    )
  }

  const handleUndoTripAction = () => {
    callUndoTripAction()
  }

  return (
    <>
      <CardContent>
        {canUndo ? (
          <>
            <Typography
              className={classes.title}
              color="textPrimary"
              gutterBottom
            >
              Are you sure you want to undo the previous trip action?
            </Typography>
          </>
        ) : (
          <Typography
            className={classes.title}
            color="textPrimary"
            gutterBottom
          >
            You can not undo this trip action.
          </Typography>
        )}
        <CardActions>
          {!saving && canUndo && !undoResponse ? (
            <Button size="small" onClick={handleUndoTripAction}>
              Yes
            </Button>
          ) : (
            'Trip Action Undone!'
          )}
          <Button size="small" color="secondary" onClick={handleClose}>
            {undoResponse ? 'Close' : 'Cancel'}
          </Button>
        </CardActions>
      </CardContent>
    </>
  )
}
