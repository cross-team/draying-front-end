import React from 'react'
import { makeStyles, withWidth, Card, Typography } from '@material-ui/core/'
import TripCard from './trip-card'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: theme.spacing(1),
  },
  margin: {
    margin: theme.spacing(1),
  },
  rightContainer: {
    width: '36%',
  },
  actionContainer: {
    width: '100%',
    backgroundColor: theme.palette.danger.light,
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: theme.spacing(1),
  },
  statusContainer: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  tabText: {
    color: '#979797',
  },
}))

export const SET_COLUMN_STATE = gql`
  mutation setColumnState(
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
  mutation setDispatchState($selectedTrip: SelectedTrip) {
    setDispatchState(selectedTrip: $selectedTrip) @client {
      selectedTrip
    }
  }
`

const DriverTripCard = ({ trip, width }) => {
  const classes = useStyles()
  const [setDispatchState] = useMutation(SET_DISPATCH_STATE)
  const [setColumnState] = useMutation(SET_COLUMN_STATE)

  const handleClick = () => {
    setDispatchState({
      variables: {
        selectedTrip: {
          id: trip.id,
        },
      },
    })
    if (width === 'xs' || width === 'sm') {
      setColumnState({
        variables: {
          hideLeft: true,
          hideMiddle: true,
          hideRight: false,
        },
      })
    } else {
      setColumnState({
        variables: {
          hideLeft: false,
          hideMiddle: false,
          hideRight: false,
        },
      })
    }
  }

  return (
    <Card className={classes.root} onClick={handleClick}>
      <div className={classes.container}>
        <div>
          <Typography>{`${trip.driver.firstName} ${trip.driver.lastName}`}</Typography>
          <Typography variant="caption">{`${trip.draying.container} - ${trip.draying.containerSize.name}, ${trip.draying.containerType.name}`}</Typography>
        </div>
        <div className={classes.rightContainer}>
          <div className={classes.actionContainer}>
            <Typography className={classes.tabText}>
              {trip.action.name}
            </Typography>
          </div>
          <div className={classes.statusContainer}>
            <Typography className={classes.tabText}>
              {trip.status.name}
            </Typography>
          </div>
        </div>
      </div>
      <TripCard trip={trip} />
    </Card>
  )
}

export default withWidth()(DriverTripCard)
