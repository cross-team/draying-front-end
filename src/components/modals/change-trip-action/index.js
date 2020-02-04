import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import PopUp from '../../common/pop-up'
import UndoTripActionContent from './undo-trip-action-content'

const DRAYING_QUERY = gql`
  query drayingInfo($drayingId: Int) {
    draying(drayingId: $drayingId) {
      id
    }
    drayingNextActions(drayingId: $drayingId) {
      tripActions {
        id
        name
      }
      startLocationTypes {
        id
        name
      }
      drayingTrip {
        id
      }
    }
  }
`



export default function UndoTripActionPopUp({ OpenPopUpButton, drayingId }) {
  const { loading, error, data } = useQuery(DRAYING_QUERY, {
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
    return <Typography color="error">Error</Typography>
  }
  if (data && !data.draying) {
    return null
  }
  return (
    <>
      {
        <PopUp ActionButton={OpenPopUpButton}>
          {handleClose => {
            return (
              <UndoTripActionContent
                handleClose={handleClose}
                drayingId={drayingId}
                tripMessages={data.drayingGetUndoTripActionMessage.tripMessages}
              />
            )
          }}
        </PopUp>
      }
    </>
  )
}
