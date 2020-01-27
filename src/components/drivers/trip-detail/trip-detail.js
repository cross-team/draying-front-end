import React from 'react'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {
  makeStyles,
  withWidth,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
} from '@material-ui/core/'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faEllipsisV } from '@fortawesome/pro-light-svg-icons/'
import Loading from '../../loading'
import OrderPanel from './order-panel'
import ContainerPanel from './container-panel'
import TripPanel from './trip-panel'

export const GET_DISPATCH_STATE = gql`
  query getDispatchState {
    dispatchState @client {
      selectedTrip {
        id
      }
    }
  }
`

export const SET_COLUMN_STATE = gql`
  mutation setColumnState($hideLeft: Boolean, $hideMiddle: Boolean, $hideRight: Boolean) {
    setColumnState(hideLeft: $hideLeft, hideMiddle: $hideMiddle, hideRight: $hideRight) @client {
      leftHidden
      middleHidden
      rightHidden
    }
  }
`

export const SET_DISPATCH_STATE = gql`
  mutation setDispatchState($selectedTrip: ID) {
    setDispatchState(selectedTrip: $selectedTrip) @client {
      selectedTrip
    }
  }
`

const useStyles = makeStyles(theme => ({
  summary: {
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  summaryPanel: {
    backgroundColor: theme.palette.primary.main,
  },
  summaryText: {
    color: theme.palette.primary.contrastText
  }
}))

const TripDetail = ({ width }) => {
  const classes = useStyles()
  const client = useApolloClient()
  const { data: { dispatchState: { selectedTrip } } } = useQuery(GET_DISPATCH_STATE)

  const trip = client.readFragment({
    id: selectedTrip.id,
    fragment: gql`
      fragment currentTrip on Trip {
        id
        locations {
          estimatedScheduledCompletedAt
          nickName {
            name
          }
          action {
            id
            name
          }
        }
        driver {
          firstName
          lastName
        }
        action {
          name
        }
        status {
          name
          status
        }
        draying {
          id
          container
          priority
          cutOffDate
          deliveryLocation {
            nickName
            locationType {
              name
            }
          }
          portStatus {
            name
          }
          loadType {
            name
          }
          containerSize {
            name
          }
          containerType {
            name
          }
          shippingLine {
            name
          }
          terminalLocation {
            nickName
          }
          returnTerminal {
            nickName
          }
        }
      }
    `,
  })
  console.log(trip)
  const [setColumnState] = useMutation(SET_COLUMN_STATE)
  const [setDispatchState] = useMutation(SET_DISPATCH_STATE)

  const handleClose = () => {
    setDispatchState({variables: { selectedTrip: { id: '' } }})
    if (width === 'xs') {
      setColumnState({variables: {
        hideLeft: true,
        hideMiddle: false,
        hideRight: true
      }})
    } else {
      setColumnState({variables: {
        hideLeft: false,
        hideMiddle: false,
        hideRight: true
      }})
    }
  }

  return (
    <>
      <AppBar position='sticky'>
        <Toolbar>
          <IconButton onClick={handleClose}>
            <FontAwesomeIcon icon={faTimes} />
          </IconButton>
          <Typography>{`Trip ${selectedTrip.id} Details`}</Typography>
        </Toolbar>
      </AppBar>
      <OrderPanel />
      <ContainerPanel draying={trip.draying} />
      <TripPanel trip={trip} />
    </>
  )
}

export default withWidth()(TripDetail)
