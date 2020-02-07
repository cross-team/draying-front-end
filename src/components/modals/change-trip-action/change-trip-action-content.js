import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import CardContent from '@material-ui/core/CardContent'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import CardHeader from '@material-ui/core/CardHeader'
import {
  getLastTrip,
  drayingIsPreDispatched,
} from '../../../utils/draying-helpers'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import SendMessageSection from './send-message-section'

const useStyles = makeStyles({
  title: {
    fontSize: 14,
  },
})

const DRAYING_INFO_QUERY = gql`
  query drayingInfo($drayingId: Int!, $tripId: Int!) {
    draying(drayingId: $drayingId) {
      id
      __typename
      trips {
        __typename
        id
        status {
          id
          __typename
          name
        }
        action {
          id
          __typename
        }
        startLocationType {
          __typename
          name
        }
        endLocationType {
          __typename
          name
        }
      }
      booking
      container
      client {
        id
        __typename
        companyName
      }
      order {
        id
        __typename
      }
      terminalLocation {
        id
        __typename
      }
    }
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
    drivers(first: 25, active: true) {
      nodes {
        id
        __typename
        firstName
        lastName
      }
    }
  }
`

export default function ChangeTripActionContent({
  handleClose,
  drayingId,
  tripId,
}) {
  const classes = useStyles()
  const [sendMessage, setSendMessage] = useState(false)
  const [selectedTripActionId, setSelectedTripActionId] = useState(0)
  const [startLocationTypeId, setStartLocationTypeId] = useState(0)
  const [selectedDriverId, setSelectedDriverId] = useState(0)

  const { loading, error, data } = useQuery(DRAYING_INFO_QUERY, {
    variables: { drayingId: +drayingId, ...(tripId && { tripId: +tripId }) },
    fetchPolicy: 'cache-and-network',
  })

  useEffect(() => {
    if (data && data.drayingNextActions) {
      setSelectedTripActionId(data.drayingNextActions.drayingTrip.action.id)
      setStartLocationTypeId(data.drayingNextActions.startLocationTypes[0].id)
      setSelectedDriverId(data.currentTrip.driver.id)
    }
  }, [data])

  if (loading && !data) {
    return <CircularProgress />
  }

  if (error) {
    return <Typography color="error">Error</Typography>
  }
  if (data && !data.draying) {
    return null
  }

  const { draying, currentTrip, drayingNextActions, drivers } = data

  const { drayingTrip, startLocationTypes } = drayingNextActions

  const TripActionDropDown = ({ tripActions }) => {
    if (tripActions.length > 0) {
      const menuItems = tripActions.map(item => (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      ))
      return (
        <TextField
          label="Trip Action"
          // className={classes.textField}
          value={selectedTripActionId}
          select
          onChange={setSelectedTripActionId}
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

  const DriverDropDown = ({ activeDrivers, onChange }) => {
    if (activeDrivers && activeDrivers.nodes.length > 0) {
      const menuItems = activeDrivers.nodes.map(item => (
        <MenuItem key={item.id} value={item.id}>
          {item.firstName} {item.lastName}
        </MenuItem>
      ))
      return (
        <TextField
          label="Driver"
          // className={classes.textField}
          value={selectedDriverId}
          select
          onChange={onChange}
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

  const StartLocationTypeDropdown = ({ startLocationTypes, onChange }) => {
    if (startLocationTypes && startLocationTypes.length > 0) {
      const menuItems = startLocationTypes.map(item => (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      ))
      return (
        <TextField
          label="Start Location"
          // className={classes.textField}
          value={startLocationTypeId}
          select
          onChange={onChange}
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

  const DropDowns = () => {
    return (
      <Grid container>
        <Grid item xs={12} sm={6}>
          <StartLocationTypeDropdown startLocationTypes={startLocationTypes} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TripActionDropDown tripActions={drayingNextActions.tripActions} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DriverDropDown activeDrivers={drivers} />
        </Grid>
      </Grid>
    )
  }
  const headerText = `Trip (${draying.trips.length}) | ${draying.order.id} ${
    draying.client.companyName
  } | ${draying.container} ${
    draying.booking !== null ? '/' + draying.booking : ''
  } | ${draying.terminalLocation.id}`

  const fromOrCurrentLocationLabel =
    +getLastTrip(draying).status.id === 5 ? 'From: ' : 'Current Location: '

  const fromOrCurrentLocation =
    +getLastTrip(draying).status.id === 5
      ? getLastTrip(draying).startLocationType.name
      : getLastTrip(draying).endLocationType.name

  const displaySkipInMovement =
    !drayingIsPreDispatched(draying) && +currentTrip.action.id !== 14

  return (
    <>
      <CardContent>
        <CardHeader title={headerText}></CardHeader>
        <Typography className={classes.title} color="textPrimary" gutterBottom>
          {fromOrCurrentLocationLabel}
          {fromOrCurrentLocation}
        </Typography>
        <Typography className={classes.title} color="textPrimary" gutterBottom>
          {fromOrCurrentLocationLabel}
          {fromOrCurrentLocation}
        </Typography>
        {displaySkipInMovement && (
          <Typography
            className={classes.title}
            color="textPrimary"
            gutterBottom
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={sendMessage}
                  onChange={e => setSendMessage(e.target.checked)}
                  value="sendMessage"
                  color="primary"
                />
              }
              label="Skip in movement?"
            />
          </Typography>
        )}
        <DropDowns />
        <SendMessageSection
          handleClose={handleClose}
          drayingId={drayingId}
          tripActionId={selectedTripActionId}
          startLocationTypeId={startLocationTypeId}
          drayingTrip={drayingTrip}
          draying={draying}
        />
      </CardContent>
    </>
  )
}
