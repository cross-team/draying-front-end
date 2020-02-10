import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import withWidth from '@material-ui/core/withWidth'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/pro-light-svg-icons/'
import OrderPanel from './order-panel'
import ContainerPanel from './container-panel'
import TripPanel from './trip-panel'
import StopsPanel from './stops/stops-panel'
import AppointmentsPanel from './appointments/appointments-panel'
import Grid from '@material-ui/core/Grid'
import Slide from '@material-ui/core/Slide'

export const GET_DISPATCH_STATE = gql`
  query getDispatchState {
    dispatchState @client {
      selectedTrip {
        id
      }
    }
  }
`

export const GET_CURRENT_TRIP = gql`
  query getCurrentTrip($tripId: Int!) {
    currentTrip(tripId: $tripId) @client {
      id
      __typename
      locations {
        __typename
        estimatedScheduledCompletedAt
        nickName {
          __typename
          name
        }
        action {
          __typename
          id
          name
        }
      }
      driver {
        __typename
        firstName
        lastName
      }
      action {
        __typename
        name
      }
      status {
        id
        __typename
        name
      }
      draying {
        __typename
        id
        container
        priority
        cutOffDate
        booking
        appointments {
          __typename
          appointmentDate
          appointmentTime
          extraStop {
            id
            __typename
            deliveryLocation {
              __typename
              nickName
            }
          }
          type {
            __typename
            shortName
          }
          locationType {
            __typename
            name
          }
        }
        extraStops {
          __typename
          id
          deliveryLocation {
            id
            __typename
            nickName
          }
        }
        deliveryLocation {
          id
          __typename
          nickName
          locationType {
            __typename
            id
            name
          }
        }
        portStatus {
          __typename
          name
        }
        loadType {
          __typename
          name
        }
        containerSize {
          __typename
          id
          name
        }
        containerType {
          __typename
          id
          name
        }
        shippingLine {
          __typename
          name
        }
        terminalLocation {
          __typename
          nickName
        }
        returnTerminal {
          __typename
          id
          nickName
        }
        order {
          __typename
          id
        }
        client {
          __typename
          companyName
        }
        containerStage {
          __typename
          id
        }
        trips {
          id
          __typename
          status {
            id
            __typename
          }
        }
      }
    }
  }
`

export const SET_COLUMN_STATE = gql`
  mutation closeTripDetail(
    $hideLeft: Boolean
    $hideMiddle: Boolean
    $hideRight: Boolean
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
  }
`

export const SET_DISPATCH_STATE = gql`
  mutation resetSelectedTrip($selectedTrip: SelectedTripInput) {
    setDispatchState(selectedTrip: $selectedTrip) @client {
      selectedTrip {
        id
      }
    }
  }
`

const TripDetail = ({ width }) => {
  const { data } = useQuery(GET_DISPATCH_STATE)

  let dispatchState
  let selectedTripId
  if (data) {
    dispatchState = data.dispatchState
  }

  if (dispatchState && dispatchState.selectedTrip) {
    selectedTripId = parseInt(dispatchState.selectedTrip.id)
  }

  const { data: tripData } = useQuery(GET_CURRENT_TRIP, {
    variables: {
      tripId: selectedTripId,
    },
  })
  let trip
  if (tripData && tripData.currentTrip) {
    trip = tripData.currentTrip
  }
  console.log(trip)
  const [setColumnState] = useMutation(SET_COLUMN_STATE)
  const [setDispatchState] = useMutation(SET_DISPATCH_STATE)

  const handleClose = () => {
    setDispatchState({ variables: { selectedTrip: { id: '' } } })
    if (width === 'xs' || width === 'sm') {
      setColumnState({
        variables: {
          hideLeft: true,
          hideMiddle: false,
          hideRight: true,
        },
      })
    } else {
      setColumnState({
        variables: {
          hideLeft: false,
          hideMiddle: false,
          hideRight: true,
        },
      })
    }
  }

  const showRightColumn = typeof trip !== 'undefined'

  return (
    <>
      <Slide direction="left" in={showRightColumn}>
        <Grid>
          <>
            <AppBar position="sticky">
              <Toolbar>
                <IconButton onClick={handleClose}>
                  <FontAwesomeIcon icon={faTimes} />
                </IconButton>
                <Typography>{`Trip ${selectedTripId &&
                  selectedTripId} Details`}</Typography>
              </Toolbar>
            </AppBar>
            {trip && (
              <>
                <OrderPanel draying={trip.draying} />
                <ContainerPanel draying={trip.draying} />
                <StopsPanel draying={trip.draying} />
                <AppointmentsPanel draying={trip.draying} />
                <TripPanel trip={trip} />
              </>
            )}
          </>
        </Grid>
      </Slide>
    </>
  )
}

export default withWidth()(TripDetail)
