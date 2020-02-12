import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import Loading from '../../loading'
import AutoCompleteTripSubmit from './auto-complete-trip-submit'

const DRAYING_INFO_QUERY = gql`
  query autoCompleteDrayingInfo($drayingId: Int!, $tripId: Int!) {
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
        driver {
          id
        }
        action {
          id
        }
        status {
          id
        }
        tripActionLocation {
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
  }
`

export default function AutoCompleteTripContent({
  handleClose,
  drayingId,
  tripId,
}) {
  const [selectedTripActionId, setSelectedTripActionId] = useState('')
  const [
    selectedStartLocationTypeId,
    setSelectedStartLocationTypeId,
  ] = useState('')
  const [selectedDriverId, setSelectedDriverId] = useState('')

  const { loading, error, data } = useQuery(DRAYING_INFO_QUERY, {
    variables: { drayingId: +drayingId, ...(tripId && { tripId: +tripId }) },
    fetchPolicy: 'cache-and-network',
  })

  useEffect(() => {
    if (data && data.drayingNextActions) {
      if (
        data.drayingNextActions.drayingTrip &&
        data.drayingNextActions.drayingTrip.action.id !== '0'
      ) {
        setSelectedTripActionId(data.drayingNextActions.drayingTrip.action.id)
      }

      setSelectedStartLocationTypeId(
        data.drayingNextActions.startLocationTypes[0].id,
      )
      if (data.currentTrip) {
        setSelectedDriverId(data.currentTrip.driver.id)
      }
    }
  }, [data])

  if (loading && !data) {
    return <Loading />
  }

  if (error) {
    return <Typography color="error">Error</Typography>
  }

  const { drayingNextActions } = data

  const { drayingTrip } = drayingNextActions

  return (
    <CardContent>
      <AutoCompleteTripSubmit
        handleClose={handleClose}
        drayingId={drayingId}
        selectedTripActionId={selectedTripActionId}
        selectedStartLocationTypeId={selectedStartLocationTypeId}
        drayingTrip={drayingTrip}
        selectedDriverId={selectedDriverId}
      />
    </CardContent>
  )
}
