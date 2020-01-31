import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import PopUp from '../common/pop-up'
import UndoTripActionContent from './undo-trip-action-content'

const CAN_UNDO_TRIP_QUERY = gql`
  query CanUndo($drayingId: Int) {
    drayingCanUndoTripAction(drayingId: $drayingId) {
      canUndo
      message
      driverId
      tripStatusId
      drayingId
      tripMessages {
        id
      }
    }
  }
`

export default function UndoTripActionPopUp({ OpenPopUpButton, drayingId }) {
  const { loading, error, data } = useQuery(CAN_UNDO_TRIP_QUERY, {
    variables: { drayingId },
    fetchPolicy: 'cache-and-network',
  })

  if (loading && !data) {
    return (
      <MenuItem>
        <Typography>Loading...</Typography>
      </MenuItem>
    )
  }

  if (error) {
    console.log(error)
    return <Typography color="error">Error</Typography>
  }
  if (data.drayingCanUndoTripAction && !data.drayingCanUndoTripAction.canUndo) {
    return null
  }
  return (
    <>
      {data.drayingCanUndoTripAction && (
        <PopUp ActionButton={OpenPopUpButton}>
          {handleClose => {
            return (
              <UndoTripActionContent
                handleClose={handleClose}
                drayingId={drayingId}
                canUndo={data.drayingCanUndoTripAction.canUndo}
              />
            )
          }}
        </PopUp>
      )}
    </>
  )
}