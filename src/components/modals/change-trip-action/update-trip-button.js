import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Loading from '../../loading'

const UPDATE_TRIP_MUTATION = gql`
  mutation updateTripActionMutation($trip: UpdateTripInput!) {
    updateTrip(trip: $trip) {
      success
      message
      updatedId
    }
  }
`

export default function UpdateTripButton({
  handleClose,
  buttonText,
  tripInput,
}) {
  const [callUpdateTripAction, { data, loading, error }] = useMutation(
    UPDATE_TRIP_MUTATION,
    {
      variables: { trip: tripInput },
      refetchQueries: ['allDriversCapacity', 'allDriverRoutes', 'currentTrip'],
      onCompleted: () => handleClose(),
    },
  )

  const handleSaveClick = () => {
    callUpdateTripAction()
  }

  if (loading && !data) {
    return (
      <Typography>
        <Loading />
      </Typography>
    )
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
