import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import Loading from '../../loading'
import { tripHasSequenceAction } from '../../../utils/trip-helpers'
import ChangeTripActionContent from '../change-trip-action/change-trip-action-content'
// import CreateTripButton from './create-trip-button'

const UPDATE_TRIP_MUTATION = gql`
  mutation aucompleteUpdateTrip($trip: UpdateTripInput!) {
    updateTrip(trip: $trip) {
      success
      message
      updatedId
    }
  }
`

const GET_NEXT_DESTINATIONS = gql`
  query getNextDestination(
    $drayingId: Int!
    $tripActionId: Int!
    $startLocationTypeId: Int!
  ) {
    drayingTripDestinations(
      drayingId: $drayingId
      tripActionId: $tripActionId
      startLocationTypeId: $startLocationTypeId
    ) {
      tripActionLocations {
        id
        hasSequenceAction
        name
        loadType {
          id
        }
      }
    }
  }
`

export default function AutoCompleteTripSubmit({
  handleClose,
  drayingId,
  selectedTripActionId,
  selectedStartLocationTypeId,
  drayingTrip,
  selectedDriverId,
}) {
  // const [body, setBody] = useState('')
  // const [sendMessage, setSendMessage] = useState(false)
  const [selectedEndLocationTypeId, setSelectedEndLocationTypeId] = useState('')
  const [tripToComplete, setTripToComplete] = useState({})
  const { loading, error, data } = useQuery(GET_NEXT_DESTINATIONS, {
    variables: {
      drayingId: +drayingId,
      tripActionId: +selectedTripActionId,
      startLocationTypeId: +selectedStartLocationTypeId,
    },
    fetchPolicy: 'cache-and-network',
  })

  const hasTripToUpdate =
    typeof drayingTrip !== 'undefined' && drayingTrip.id !== '0'

  useEffect(() => {
    if (
      data &&
      typeof data.drayingTripDestinations !== 'undefined' &&
      data.drayingTripDestinations.tripActionLocations.length > 0
    ) {
      setSelectedEndLocationTypeId(
        data.drayingTripDestinations.tripActionLocations[0].id,
      )
      // const generateMessage = () => {
      //   // if (draying == null || drayingTrip.action.id() == null) {
      //   //   return null
      //   // }
      //   // const action = selectedTripActionId
      //   // if (action == null) {
      //   //   return null
      //   // }
      //   const msg = ''
      //   // if (drayingIsPreDispatched(draying) || showPredispatchButton) {
      //   //   msg += showPredispatchCheckbox ? 'For tomorrow | ' : ''
      //   // }

      //   // const LastTrip = getLastTrip(draying)
      //   // let isLive = false
      //   // if (
      //   //   LastTrip != null &&
      //   //   LastTrip.status.id == 5 &&
      //   //   (drayingTrip.status.id == 2 || drayingTrip.status.id == 0)
      //   // ) {
      //   //   isLive = true
      //   // }

      //   // const from = ''
      //   // const to = ''

      //   // const ClientDestinations = getClientDestinations(draying)

      //   // switch (drayingTrip.startLocationType.id) {
      //   //   case 2:
      //   //     let loc = ClientDestinations[self.NumberOfClientDestinationsCompleted(self.DeliveryOrderDraying()) - (isLive ? 0 : 1)];
      //   //     from = loc.NickName + ', ' + loc.GoogleAddress;
      //   //     if (self.DeliveryOrderDraying().SpecificAppoinmentPickUpFromClient) {
      //   //       from = from + ' APPT: ' + FormatDate(self.DeliveryOrderDraying().PickUpClientDateFrom) + ' ' + FormatTimeFromTime(self.DeliveryOrderDraying().PickUpClientTimeFrom);
      //   //     }
      //   //     break;
      //   //   case 3:
      //   //     from = 'Yard';
      //   //     break;
      //   //   case 4:
      //   //     from = 'Quality Cont';
      //   //     break;
      //   //   case 5:
      //   //     from = self.DeliveryOrderDraying().TerminalLocation.ShortName;
      //   //     break;
      //   //   case 6:
      //   //     from = 'Yard';
      //   //     break;
      //   //   case 7:
      //   //     if (self.DeliveryOrderDraying().OriginStreetTurnLocationNickName != null) {
      //   //       from = self.DeliveryOrderDraying().OriginStreetTurnLocationNickName.NickName + ', ' + self.DeliveryOrderDraying().OriginStreetTurnLocationNickName.GoogleAddress;
      //   //     }
      //   //     break;
      //   //   default:
      //   //     break
      //   // }

      //   // msg += 'from: ' + from + ' | '

      //   // if (self.DeliveryOrderDraying().Container != null && self.DeliveryOrderDraying().Container.length > 5) {
      //   //   msg += "CONT: " + self.DeliveryOrderDraying().Container + (self.DeliveryOrderDraying().Booking != null ? ' / Booking: ' + self.DeliveryOrderDraying().Booking : '') + " | ";
      //   // } else if (self.DeliveryOrderDraying().Booking != null && self.DeliveryOrderDraying().Booking.length > 0) {
      //   //   msg += 'Booking: ' + self.DeliveryOrderDraying().Booking + " | ";
      //   // }

      //   // msg += self.DeliveryOrderDraying().ContainerSize.Name + " | ";
      //   // //msg += self.DeliveryOrderDraying().ContainerSize.Name + '/' + self.DeliveryOrderDraying().ContainerType.ShortName + " | ";
      //   // if (self.DeliveryOrderDraying().Overweight) {
      //   //   msg += "Overweight | "
      //   // }

      //   // if (self.DrayingTrip().TripActionLocationId() > 0) {
      //   //   //console.log(self.TripActionLocationSelected(self.DrayingTrip()));
      //   //   let endLocationTypeId = action.NextLocationTypeId;
      //   //   //console.log(endLocationTypeId);
      //   //   switch (endLocationTypeId) {
      //   //     case 2:
      //   //       let isSecuence = false;
      //   //       if (self.DrayingTrip().StartLocationTypeId() == 2 && (self.LastTrip().TripStatusId == 5 && self.LastTrip().DrayingTripId != self.DrayingTrip().DrayingTripId())) {
      //   //         isSecuence = true;
      //   //       }
      //   //       let loc = ClientDestinations[self.NumberOfClientDestinationsCompleted(self.DeliveryOrderDraying()) + (isSecuence ? 1 : 0)];
      //   //       to = loc.NickName + ', ' + loc.GoogleAddress;
      //   //       if (self.DeliveryOrderDraying().AppointmentNeeded) {
      //   //         to = to + ' APPT: ' + FormatDate(self.DeliveryOrderDraying().AppointmentDate) + ' ' + FormatTimeFromTime(self.DeliveryOrderDraying().AppointmentTime);
      //   //       }
      //   //       if (loc.DeliveryLocationId == 133) {
      //   //         to += " | Recoger cheque COD / Pick Check COD"
      //   //       }
      //   //       break;
      //   //     case 3:
      //   //       to = 'Yard';
      //   //       break;
      //   //     case 4:
      //   //       to = 'Quality Cont';
      //   //       break;
      //   //     case 5:
      //   //       if (self.DeliveryOrderDraying().ReturnTerminal != null) {
      //   //         to = self.DeliveryOrderDraying().ReturnTerminal.ShortName;
      //   //       } else {
      //   //         to = self.DeliveryOrderDraying().TerminalLocation.ShortName;
      //   //       }
      //   //       break;
      //   //     case 6:
      //   //       to = 'Yard';
      //   //       break;
      //   //   }
      //   //   msg += "to: " + to;

      //   //   if (endLocationTypeId != 2 && (self.DeliveryOrderDraying().DrayingTrips.filter(d => d.TripStatusId >= 5).length == 0)) {
      //   //     let loc = ClientDestinations[0];
      //   //     let client = loc.NickName + ', ' + loc.GoogleAddress;
      //   //     msg += ' | Client: ' + client;
      //   //   }
      //   // }

      //   // self.Message(msg);
      //   return msg
      // }
      // setBody(generateMessage())
      setTripToComplete({
        ...(hasTripToUpdate && { tripId: +drayingTrip.id }),
        drayingId: +drayingId,
        tripActionId: +selectedTripActionId,
        ...(hasTripToUpdate && { tripStatusId: 6 }),
        driverId: +selectedDriverId,
        ...(hasTripToUpdate && {
          tripActionLocationId: +drayingTrip.tripActionLocation.id,
        }),
        startLocationTypeId: +selectedStartLocationTypeId,
        endLocationTypeId: +selectedEndLocationTypeId,
      })
    }
  }, [
    data,
    drayingId,
    drayingTrip.id,
    drayingTrip.status.id,
    drayingTrip.tripActionLocation.id,
    hasTripToUpdate,
    selectedDriverId,
    selectedEndLocationTypeId,
    selectedStartLocationTypeId,
    selectedTripActionId,
  ])

  const [
    callUpdateTripAction,
    { data: completeResponse, loading: completing, error: errorCompleting },
  ] = useMutation(UPDATE_TRIP_MUTATION, {
    refetchQueries: ['allDriversCapacity', 'allDriverRoutes', 'currentTrip'],
    onCompleted: () => {},
  })

  const hasNextTripActionLocations =
    data &&
    drayingTrip &&
    drayingTrip.tripActionLocation !== null &&
    data.drayingTripDestinations.tripActionLocations.length > 0

  const showNextActionButton =
    hasTripToUpdate &&
    hasNextTripActionLocations &&
    tripHasSequenceAction(
      drayingTrip,
      data.drayingTripDestinations.tripActionLocations,
    )

  useEffect(() => {
    if (
      data &&
      tripToComplete.drayingId &&
      !showNextActionButton &&
      tripToComplete.driverId !== 0 &&
      tripToComplete.endLocationTypeId !== 0
    ) {
      callUpdateTripAction({ variables: { trip: tripToComplete } })
    }
  }, [
    callUpdateTripAction,
    data,
    hasTripToUpdate,
    showNextActionButton,
    tripToComplete,
  ])

  if (loading && !data) {
    return <Loading />
  }

  if (error) {
    return <Typography color="error">Error</Typography>
  }

  if (completing && !completeResponse) {
    return <Loading />
  }

  if (errorCompleting) {
    return <Typography color="error">Error</Typography>
  }

  return (
    <>
      {completeResponse && completeResponse.updateTrip.status ? (
        <Typography color="secondary">Trip Completed!</Typography>
      ) : (
        <Typography color="error">
          {completeResponse && completeResponse.updateTrip.message}
        </Typography>
      )}
      {completeResponse && <Button onClick={handleClose}>Close</Button>}
      {showNextActionButton && (
        <ChangeTripActionContent
          handleClose={handleClose}
          drayingId={drayingId}
          tripId={drayingTrip.id}
          isCompletable={true}
        />
      )}
    </>
  )
}
