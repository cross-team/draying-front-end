import React from 'react'
import {
  makeStyles,
  withWidth,
  Card,
  Avatar,
  Typography,
  IconButton,
} from '@material-ui/core/'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/pro-light-svg-icons/'
import { useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(1),
  },
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  margin: {
    margin: theme.spacing(1),
  },
}))

export const SET_COLUMN_STATE = gql`
  mutation showTripsPanelFromHeader(
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
  mutation resetDispatchState(
    $selectedDriver: SelectedDriverInput
    $selectedTrip: SelectedTripInput
  ) {
    setDispatchState(
      selectedDriver: $selectedDriver
      selectedTrip: $selectedTrip
    ) @client {
      selectedDriver {
        id
      }
      selectedTrip {
        id
      }
    }
  }
`

export const GET_DISPATCH_STATE = gql`
  query getSelectedDriverInfo {
    dispatchState @client {
      selectedDriver {
        id
        firstName
        lastName
        phone
      }
    }
  }
`

const DriverHeader = ({ width }) => {
  const classes = useStyles()
  const [setColumnState] = useMutation(SET_COLUMN_STATE)
  const [setDispatchState] = useMutation(SET_DISPATCH_STATE)
  const {
    data: {
      dispatchState: { selectedDriver },
    },
  } = useQuery(GET_DISPATCH_STATE)

  const fullName = `${selectedDriver.firstName} ${selectedDriver.lastName}`
  const initials = `${selectedDriver.firstName[0]}${selectedDriver.lastName[0]}`

  const handleClose = () => {
    setDispatchState({
      variables: {
        selectedDriver: {
          id: '',
          firstName: '',
          lastName: '',
          phone: '',
        },
        selectedTrip: { id: '' },
      },
    })
    if (width === 'xs') {
      setColumnState({
        variables: {
          hideLeft: false,
          hideMiddle: true,
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

  return (
    <Card className={classes.root}>
      <div className={classes.container}>
        <IconButton onClick={handleClose}>
          <FontAwesomeIcon icon={faTimes} />
        </IconButton>
        <Avatar className={classes.margin}>{initials.toUpperCase()}</Avatar>
        <div>
          <Typography>{fullName}</Typography>
          <Typography variant="caption">{selectedDriver.phone}</Typography>
        </div>
      </div>
    </Card>
  )
}

export default withWidth()(DriverHeader)
