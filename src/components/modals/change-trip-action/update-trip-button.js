import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const UPDATE_TRIP_MUTATION = gql`
  mutation updateTripActionMutation($trip: UpdateTripInput!) {
    updateTrip(trip: $trip) {
      success
      message
      updatedId
    }
  }
`

export default function UpdateTripButton({ handleClose, tripId, buttonText }) {
  const [callUpdateTripAction, { data, loading, error }] = useMutation(
    UPDATE_TRIP_MUTATION,
    {
      variables: { tripId },
      refetchQueries: ['allDriversCapacity', 'allDriverRoutes'],
      onCompleted: () => handleClose(),
    },
  )

  const handleSaveClick = () => {
    callUpdateTripAction()
  }

  if (loading && !data) {
    return <Typography>Loading...</Typography>
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
