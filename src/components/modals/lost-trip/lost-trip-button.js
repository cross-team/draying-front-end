import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import useMediaQuery from '@material-ui/core/useMediaQuery'
import Loading from '../../loading'

const LOST_TRIP_MUTATION = gql`
  mutation lostTripMutation($tripId: Int!) {
    setTripLost(tripId: $tripId) {
      success
      message
      updatedId
    }
  }
`

export const CLOSE_PANEL = gql`
  mutation lostTripClosePanel(
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

export default function LostTripButton({
  closeModal,
  tripId,
  setErrorMessage,
}) {
  const [closeTripPanel] = useMutation(CLOSE_PANEL)
  const theme = useTheme()
  const isBigScreen = useMediaQuery(theme.breakpoints.up('sm'))

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
  const [callLostTrip, { data, loading, error }] = useMutation(
    LOST_TRIP_MUTATION,
    {
      variables: { tripId: +tripId },
      refetchQueries: ['allDriversCapacity', 'allDriverRoutes', 'currentTrip'],
      awaitRefetchQueries: true,
      onCompleted: ({ setTripLost }) => {
        if (setTripLost.success) {
          closePanel()
        }
        setErrorMessage(setTripLost.message)
      },
    },
  )

  if (loading && !data) {
    return <Loading />
  }

  if (error) {
    return <Typography color="error">Error</Typography>
  }

  return (
    <Button size="small" onClick={callLostTrip}>
      Yes
    </Button>
  )
}
