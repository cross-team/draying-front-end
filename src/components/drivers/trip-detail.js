import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {
  makeStyles,
  withWidth,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Card
} from '@material-ui/core/'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faEllipsisV } from '@fortawesome/pro-light-svg-icons/'
import Loading from '../loading'

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
  },
}))

const TripDetail = ({ width }) => {
  const classes = useStyles()
  const { data: { dispatchState: { selectedTrip } } } = useQuery(GET_DISPATCH_STATE)

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

  const expansionPanel = ( title, details ) => (
    <ExpansionPanel defaultExpanded={true}>
      <ExpansionPanelSummary>
        <div className={classes.summary}>
          <Typography>{title}</Typography>
          <IconButton
            onClick={event => event.stopPropagation()}
            onFocus={event => event.stopPropagation()}
          >
            <FontAwesomeIcon icon={faEllipsisV} />
          </IconButton>
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>{details}</ExpansionPanelDetails>
    </ExpansionPanel>
  )

  const order = expansionPanel( 'Order', 
    <div>
      <Typography>#Order Num</Typography>
      <Typography>Delivery Order Status</Typography>
    </div>
  )

  const container = expansionPanel( 'Container', 
    <div>
      <Typography>Current Trip Action ></Typography>
      <Card>
        <Typography>Container Num</Typography>
        <Typography>Size, Type</Typography>
        <Typography>Priority</Typography>
        <Typography>Delivery Location Type</Typography>
        <Typography>EXP/IMP</Typography>
        <Typography>Cutoff Date</Typography>
        <Typography>Port Status</Typography>
      </Card>
      <div>
        <Typography>Shipping Line/Terminal</Typography>
        <Typography>1st Stop</Typography>
        <Typography>2nd Stop</Typography>
        <Typography>Return Terminal</Typography>
      </div>
      <Typography>Appointments</Typography>
      <Typography>Container Location History</Typography>
    </div>
  )

  const currentTrip = expansionPanel( 'Trip (current trip)', 
    <div>
      <Typography>Available Trip Actions ></Typography>
      <Typography>[Trip Card]</Typography>
    </div>
  )

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
      {order}
      {container}
      {currentTrip}
    </>
  )
}

export default withWidth()(TripDetail)
