import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CardActions from '@material-ui/core/CardActions'
// import CardContent from '@material-ui/core/CardContent'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import Collapse from '@material-ui/core/Collapse'
// import CardHeader from '@material-ui/core/CardHeader'
import {
  // getLastTrip,
  drayingIsPreDispatched,
  // getClientDestinations,
} from '../../../utils/draying-helpers'
import { tripHasSequenceAction } from '../../../utils/trip-helpers'
import UpdateTripButton from './update-trip-button'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Loading from '../../loading'
// import CreateTripButton from './create-trip-button'

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

export default function SendMessageSection({
  handleClose,
  drayingId,
  selectedTripActionId,
  selectedStartLocationTypeId,
  drayingTrip,
  draying,
  selectedDriverId,
  isCompletable,
}) {
  const [body, setBody] = useState('')
  const [sendMessage, setSendMessage] = useState(false)
  const [selectedEndLocationTypeId, setSelectedEndLocationTypeId] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const { loading, error, data } = useQuery(GET_NEXT_DESTINATIONS, {
    variables: {
      drayingId: +drayingId,
      tripActionId: +selectedTripActionId,
      startLocationTypeId: +selectedStartLocationTypeId,
    },
    fetchPolicy: 'cache-and-network',
  })

  // useEffect(() => {
  //   if (drayingTrip) {
  //     setSelectedEndLocationTypeId(drayingTrip.tripActionLocation.id)
  //   }
  // }, [drayingTrip])

  useEffect(() => {
    if (
      data &&
      typeof data.drayingTripDestinations !== 'undefined' &&
      data.drayingTripDestinations.tripActionLocations.length > 0
    ) {
      setSelectedEndLocationTypeId(
        data.drayingTripDestinations.tripActionLocations[0].id,
      )
      const generateMessage = () => {
        // if (draying == null || drayingTrip.action.id() == null) {
        //   return null
        // }
        // const action = selectedTripActionId
        // if (action == null) {
        //   return null
        // }
        const msg = ''
        // if (drayingIsPreDispatched(draying) || showPredispatchButton) {
        //   msg += showPredispatchCheckbox ? 'For tomorrow | ' : ''
        // }

        // const LastTrip = getLastTrip(draying)
        // let isLive = false
        // if (
        //   LastTrip != null &&
        //   LastTrip.status.id == 5 &&
        //   (drayingTrip.status.id == 2 || drayingTrip.status.id == 0)
        // ) {
        //   isLive = true
        // }

        // const from = ''
        // const to = ''

        // const ClientDestinations = getClientDestinations(draying)

        // switch (drayingTrip.startLocationType.id) {
        //   case 2:
        //     let loc = ClientDestinations[self.NumberOfClientDestinationsCompleted(self.DeliveryOrderDraying()) - (isLive ? 0 : 1)];
        //     from = loc.NickName + ', ' + loc.GoogleAddress;
        //     if (self.DeliveryOrderDraying().SpecificAppoinmentPickUpFromClient) {
        //       from = from + ' APPT: ' + FormatDate(self.DeliveryOrderDraying().PickUpClientDateFrom) + ' ' + FormatTimeFromTime(self.DeliveryOrderDraying().PickUpClientTimeFrom);
        //     }
        //     break;
        //   case 3:
        //     from = 'Yard';
        //     break;
        //   case 4:
        //     from = 'Quality Cont';
        //     break;
        //   case 5:
        //     from = self.DeliveryOrderDraying().TerminalLocation.ShortName;
        //     break;
        //   case 6:
        //     from = 'Yard';
        //     break;
        //   case 7:
        //     if (self.DeliveryOrderDraying().OriginStreetTurnLocationNickName != null) {
        //       from = self.DeliveryOrderDraying().OriginStreetTurnLocationNickName.NickName + ', ' + self.DeliveryOrderDraying().OriginStreetTurnLocationNickName.GoogleAddress;
        //     }
        //     break;
        //   default:
        //     break
        // }

        // msg += 'from: ' + from + ' | '

        // if (self.DeliveryOrderDraying().Container != null && self.DeliveryOrderDraying().Container.length > 5) {
        //   msg += "CONT: " + self.DeliveryOrderDraying().Container + (self.DeliveryOrderDraying().Booking != null ? ' / Booking: ' + self.DeliveryOrderDraying().Booking : '') + " | ";
        // } else if (self.DeliveryOrderDraying().Booking != null && self.DeliveryOrderDraying().Booking.length > 0) {
        //   msg += 'Booking: ' + self.DeliveryOrderDraying().Booking + " | ";
        // }

        // msg += self.DeliveryOrderDraying().ContainerSize.Name + " | ";
        // //msg += self.DeliveryOrderDraying().ContainerSize.Name + '/' + self.DeliveryOrderDraying().ContainerType.ShortName + " | ";
        // if (self.DeliveryOrderDraying().Overweight) {
        //   msg += "Overweight | "
        // }

        // if (self.DrayingTrip().TripActionLocationId() > 0) {
        //   //console.log(self.TripActionLocationSelected(self.DrayingTrip()));
        //   let endLocationTypeId = action.NextLocationTypeId;
        //   //console.log(endLocationTypeId);
        //   switch (endLocationTypeId) {
        //     case 2:
        //       let isSecuence = false;
        //       if (self.DrayingTrip().StartLocationTypeId() == 2 && (self.LastTrip().TripStatusId == 5 && self.LastTrip().DrayingTripId != self.DrayingTrip().DrayingTripId())) {
        //         isSecuence = true;
        //       }
        //       let loc = ClientDestinations[self.NumberOfClientDestinationsCompleted(self.DeliveryOrderDraying()) + (isSecuence ? 1 : 0)];
        //       to = loc.NickName + ', ' + loc.GoogleAddress;
        //       if (self.DeliveryOrderDraying().AppointmentNeeded) {
        //         to = to + ' APPT: ' + FormatDate(self.DeliveryOrderDraying().AppointmentDate) + ' ' + FormatTimeFromTime(self.DeliveryOrderDraying().AppointmentTime);
        //       }
        //       if (loc.DeliveryLocationId == 133) {
        //         to += " | Recoger cheque COD / Pick Check COD"
        //       }
        //       break;
        //     case 3:
        //       to = 'Yard';
        //       break;
        //     case 4:
        //       to = 'Quality Cont';
        //       break;
        //     case 5:
        //       if (self.DeliveryOrderDraying().ReturnTerminal != null) {
        //         to = self.DeliveryOrderDraying().ReturnTerminal.ShortName;
        //       } else {
        //         to = self.DeliveryOrderDraying().TerminalLocation.ShortName;
        //       }
        //       break;
        //     case 6:
        //       to = 'Yard';
        //       break;
        //   }
        //   msg += "to: " + to;

        //   if (endLocationTypeId != 2 && (self.DeliveryOrderDraying().DrayingTrips.filter(d => d.TripStatusId >= 5).length == 0)) {
        //     let loc = ClientDestinations[0];
        //     let client = loc.NickName + ', ' + loc.GoogleAddress;
        //     msg += ' | Client: ' + client;
        //   }
        // }

        // self.Message(msg);
        return msg
      }
      setBody(generateMessage())
    }
  }, [data])

  if (loading && !data) {
    return <Loading />
  }

  if (error) {
    return <Typography color="error">Error</Typography>
  }

  const { drayingTripDestinations } = data
  const hasTripToUpdate =
    typeof drayingTrip !== 'undefined' && drayingTrip.id !== '0'
  const tripInput = {
    ...(hasTripToUpdate && { tripId: +drayingTrip.id }),
    drayingId: +drayingId,
    tripActionId: +selectedTripActionId,
    ...(hasTripToUpdate && { tripStatusId: +drayingTrip.status.id }),
    driverId: +selectedDriverId,
    ...(hasTripToUpdate && {
      tripActionLocationId: +drayingTrip.tripActionLocation.id,
    }),
    startLocationTypeId: +selectedStartLocationTypeId,
    endLocationTypeId: +selectedEndLocationTypeId,
  }

  const isPreDispatched = drayingIsPreDispatched(draying)
  // const isCompletable = tripIsCompletable(drayingTrip)

  const showPredispatchCheckbox = isPreDispatched && !isCompletable

  const showPredispatchButton =
    isPreDispatched && hasTripToUpdate && !isCompletable

  const showDispatchButton = isPreDispatched && isCompletable

  const showSaveButton = !isPreDispatched && !isCompletable

  const hasNextTripActionLocations =
    drayingTrip &&
    drayingTrip.tripActionLocation !== null &&
    drayingTripDestinations.tripActionLocations.length > 0

  const showCompleteButton =
    !isPreDispatched &&
    isCompletable &&
    hasTripToUpdate &&
    hasNextTripActionLocations &&
    !tripHasSequenceAction(
      drayingTrip,
      drayingTripDestinations.tripActionLocations,
    )

  const showNextActionButton =
    !isPreDispatched &&
    isCompletable &&
    hasTripToUpdate &&
    hasNextTripActionLocations &&
    tripHasSequenceAction(
      drayingTrip,
      drayingTripDestinations.tripActionLocations,
    )

  if (showCompleteButton) {
  }

  const SendMessagePanel = () => {
    return (
      <>
        <Collapse in={!sendMessage} timeout="auto" unmountOnExit>
          <Grid container spacing={2}>
            <Grid item>
              <Typography>Message:</Typography>
            </Grid>
            <Grid item>
              <TextareaAutosize
                aria-label="Send message text."
                rowsMin={3}
                placeholder={body}
                onChange={e => setBody(e.target.value)}
                value={body}
              />
            </Grid>
          </Grid>
        </Collapse>
      </>
    )
  }

  const EndLocationDropdown = ({ endLocations, onChange }) => {
    if (endLocations && endLocations.length > 1) {
      const menuItems = endLocations.map(item => (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      ))
      return (
        <TextField
          label="End Locations"
          // className={classes.textField}
          value={selectedEndLocationTypeId}
          select
          onChange={e => setSelectedEndLocationTypeId(e.target.value)}
          margin="normal"
          variant="outlined"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        >
          {menuItems}
        </TextField>
      )
    }
    return null
  }

  const getSelectedEndLocationLoadTypeId = () => {
    drayingTripDestinations.tripActionLocations.filter(
      loc => loc.id === selectedEndLocationTypeId,
    )
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <EndLocationDropdown
            endLocations={drayingTripDestinations.tripActionLocations}
          />
        </Grid>
      </Grid>

      <SendMessagePanel />
      {showPredispatchCheckbox && (
        <Typography color="textPrimary" gutterBottom>
          <FormControlLabel
            control={
              <Checkbox
                checked={sendMessage}
                onChange={e => setSendMessage(e.target.checked)}
                value="sendMessage"
                color="primary"
              />
            }
            label="Predispatch for tomorrow?"
          />
        </Typography>
      )}
      <CardActions>
        <>
          {showPredispatchButton && (
            <UpdateTripButton
              handleClose={handleClose}
              buttonText={
                hasTripToUpdate ? 'Update Predispatch' : 'Predispatch'
              }
              tripInput={tripInput}
              setErrorMessage={setErrorMessage}
            />
          )}
          {showDispatchButton && (
            <UpdateTripButton
              handleClose={handleClose}
              buttonText="Dispatch"
              tripInput={{ ...tripInput, tripStatusId: 5 }}
              setErrorMessage={setErrorMessage}
            />
          )}
          {showSaveButton && (
            <UpdateTripButton
              handleClose={handleClose}
              buttonText={hasTripToUpdate ? 'Update' : 'Create'}
              tripInput={tripInput}
              setErrorMessage={setErrorMessage}
            />
          )}
          {showCompleteButton && (
            <UpdateTripButton
              handleClose={handleClose}
              buttonText="Complete"
              tripInput={{ ...tripInput, tripStatusId: 6 }}
              setErrorMessage={setErrorMessage}
            />
          )}

          {showNextActionButton && (
            <UpdateTripButton
              handleClose={handleClose}
              buttonText={
                getSelectedEndLocationLoadTypeId() &&
                getSelectedEndLocationLoadTypeId().loadType.id === '1'
                  ? 'Unloaded'
                  : 'Loaded'
              }
              tripInput={tripInput}
            />
          )}
        </>

        <Button size="small" color="secondary" onClick={handleClose}>
          {'Cancel'}
        </Button>

        <Typography color="error">{errorMessage}</Typography>
      </CardActions>
    </>
  )
}
