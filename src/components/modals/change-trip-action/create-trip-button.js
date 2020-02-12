import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Loading from '../../loading'

const CREATE_TRIP_MUTATION = gql`
  mutation createTrip($trip: DispatchDrayingInput!) {
    dispatchDraying(trip: $trip) {
      success
      message
      updatedId
    }
  }
`

export default function CreateTripButton({
  handleClose,
  buttonText,
  tripInput,
  setErrorMessage,
}) {
  const [callCreateTripAction, { data, loading, error }] = useMutation(
    CREATE_TRIP_MUTATION,
    {
      variables: { trip: tripInput },
      refetchQueries: ['allDriversCapacity', 'allDriverRoutes', 'currentTrip'],
      onCompleted: ({ dispatchDraying }) => {
        if (dispatchDraying.success) {
          handleClose()
        }
        setErrorMessage(dispatchDraying.message)
      },
    },
  )

  const handleSaveClick = () => {
    callCreateTripAction()
  }

  if (loading && !data) {
    return <Loading />
  }

  if (error) {
    return <Typography color="error">Error</Typography>
  }

  return (
    <>
      <Button size="small" onClick={handleSaveClick}>
        {buttonText}
      </Button>
    </>
  )
}
