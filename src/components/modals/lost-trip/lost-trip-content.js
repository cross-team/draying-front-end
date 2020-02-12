import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'

import LostTripButton from './lost-trip-button'

export default function LostTripContent({ handleClose: closeModal, tripId }) {
  const [errorMessage, setErrorMessage] = useState('')
  return (
    <>
      <CardContent>
        <CardHeader title={'Confirm trip lost'}></CardHeader>
        <Typography color="textPrimary" gutterBottom>
          Are you sure you want to set the trip as lost?
        </Typography>
        <CardActions>
          <LostTripButton
            tripId={tripId}
            closeModal={closeModal}
            setErrorMessage={setErrorMessage}
          ></LostTripButton>
          <Button size="small" color="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Typography color="error">{errorMessage}</Typography>
        </CardActions>
      </CardContent>
    </>
  )
}
