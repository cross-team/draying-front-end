import React from 'react'
import {
  makeStyles,
  withWidth,
  Card,
  Avatar,
  Typography,
  Chip
} from '@material-ui/core/'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/pro-light-svg-icons/'
import { useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: '#ebf5ff'
  },
  dataContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(1),
  },
  chipContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  margin: {
    margin: theme.spacing(1),
  },
  success: {
    backgroundColor: theme.palette.success
  },
  warning: {
    backgroundColor: theme.palette.warning
  },
  danger: {
    backgroundColor: theme.palette.danger
  }
}))

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
  mutation setDispatchState($selectedDriver: SelectedDriver) {
    setDispatchState(selectedDriver: $selectedDriver) @client {
      selectedDriver
    }
  }
`

export const GET_DISPATCH_STATE = gql`
  query getDispatchState {
    dispatchState @client {
      selectedDriver {
        id
      }
    }
  }
`

const CollapsedDriverCard = ({ driver, width }) => {
  const classes = useStyles()

  const { data: { dispatchState: { selectedDriver } } } = useQuery(GET_DISPATCH_STATE)
  const [setDispatchState] = useMutation(SET_DISPATCH_STATE)
  const [setColumnState] = useMutation(SET_COLUMN_STATE)

  const isSelected = (selectedDriver.id === driver.id)

  const fullName = `${driver.firstName} ${driver.lastName}`
  const initials = `${driver.firstName[0]}${driver.lastName[0]}`

  const { capacityInfo } = driver
  const capacity = Math.round(100 - capacityInfo.capacity)
  let capacityColor
  if (capacity >= 67) {
    capacityColor = classes.success
  } else if (capacity >= 34) {
    capacityColor = classes.warning
  } else {
    capacityColor = classes.danger
  }

  let currentETA = 0
  let minutes = 0
  if (capacityInfo.activeTripCapacity !== null) {
    currentETA = new Date(capacityInfo.activeTripCapacity.currentDestination.estimatedScheduledCompletedAt)
    minutes = Math.round((currentETA.getTime() - Date.now())/60000)
  }

  const handleClick = () => {
    setDispatchState({variables: { selectedDriver: {
      id: driver.id,
      firstName: driver.firstName,
      lastName: driver.lastName,
      phone: driver.phone
    }, selectedTrip: { id: '' }}})
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
    <Card className={`${classes.root} ${isSelected && classes.selected}`} onClick={handleClick}>
      <Avatar className={classes.margin}>{initials.toUpperCase()}</Avatar>
      <div className={classes.dataContainer}>
        <Typography>{fullName}</Typography>
        <div className={classes.chipContainer}>
          <Chip className={capacityColor} label={`${capacity}%`} />
          <div>
            { capacityInfo.activeTripCapacity && <Chip label={`${minutes} min`} /> }
            <Chip label={`${capacityInfo.pendingTripsCount} ${
              capacityInfo.pendingTripsCount === 1 ?
              'Trip' : 'Trips'
            }`} />
          </div>
        </div>
      </div>
      <FontAwesomeIcon icon={faAngleRight} className={classes.margin} />
    </Card>
  )
}

export default withWidth()(CollapsedDriverCard)
