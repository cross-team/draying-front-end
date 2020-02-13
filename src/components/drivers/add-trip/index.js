import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import withWidth from '@material-ui/core/withWidth'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/pro-light-svg-icons/'
import parseISO from 'date-fns/parseISO'
import format from 'date-fns/format'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Chip from '@material-ui/core/Chip'
import Box from '@material-ui/core/Box'
import Drayings from './drayings'
import debounce from 'lodash/debounce'

export const GET_DISPATCH_STATE = gql`
  query addTripGetDispatchState {
    dispatchState @client {
      selectedTrip {
        id
      }
      addTripDate
    }
  }
`
export const SET_COLUMN_STATE = gql`
  mutation closeAddTrip(
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
const handleFilter = debounce((val, callback) => {
  callback(val)
}, 250)

const AddTrip = ({ width }) => {
  const { data } = useQuery(GET_DISPATCH_STATE)
  const [orderBy, setOrderBy] = useState('priority')
  const [searchBookings, setSearchBookings] = useState('')
  const [searchBookingsInput, setSearchBookingsInput] = useState('')
  const [currentLocationTypes, setCurrentLocationTypes] = useState([])
  let dispatchState

  if (data) {
    dispatchState = data.dispatchState
  }
  const [setColumnState] = useMutation(SET_COLUMN_STATE)

  const handleClose = () => {
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

  const shouldFormatDate =
    dispatchState &&
    dispatchState.addTripDate !== 'Tomorrow' &&
    dispatchState.addTripDate !== 'Today' &&
    dispatchState.addTripDate !== ''

  const handleOrderChange = event => {
    setOrderBy(event.target.value)
  }

  const handleSearchChange = e => {
    const value = e.target.value
    setSearchBookingsInput(value)
    handleFilter(value, setSearchBookings)
  }

  const orderByValues = [
    { name: 'Priority', value: 'priority' },
    { name: 'Driver match', value: 'driver_match' },
  ]
  const menuItems = orderByValues.map(({ name, value }) => (
    <MenuItem key={name} value={value}>
      {name}
    </MenuItem>
  ))

  const handleChipClick = val => event => {
    if (val === 0) {
      setCurrentLocationTypes([])
    } else if (currentLocationTypes.indexOf(val) === -1) {
      setCurrentLocationTypes([...currentLocationTypes, val])
    }
  }
  const handleDeleteChipClick = val => event => {
    setCurrentLocationTypes(currentLocationTypes.filter(type => type !== val))
  }

  return (
    <>
      <Grid>
        <>
          <AppBar position="sticky">
            <Toolbar>
              <IconButton onClick={handleClose}>
                <FontAwesomeIcon icon={faTimes} />
              </IconButton>
              <Typography>{`Add Trip for ${
                shouldFormatDate
                  ? format(parseISO(dispatchState.addTripDate), 'MM/dd/yyyy')
                  : dispatchState.addTripDate
              }:`}</Typography>
            </Toolbar>
          </AppBar>
          <Grid container>
            <Grid item xs={6}>
              <TextField
                label="Sort By:"
                value={orderBy}
                select
                onChange={handleOrderChange}
                margin="normal"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {menuItems}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Search Bookings"
                value={searchBookingsInput}
                margin="normal"
                variant="outlined"
                fullWidth
                onChange={handleSearchChange}
              />
            </Grid>

            <Box m={1} width="100%">
              <Grid container item xs={12} justify="space-evenly" m={2}>
                <Chip
                  label="All"
                  size="small"
                  onClick={handleChipClick(0)}
                  color={currentLocationTypes.length === 0 ? 'primary' : ''}
                ></Chip>
                <Chip
                  label="To Dispatch"
                  size="small"
                  onDelete={handleDeleteChipClick(5)}
                  onClick={handleChipClick(5)}
                  color={
                    currentLocationTypes.indexOf(5) !== -1 ? 'primary' : ''
                  }
                ></Chip>
                <Chip
                  label="Yard Before"
                  size="small"
                  onDelete={handleDeleteChipClick(6)}
                  onClick={handleChipClick(6)}
                  color={
                    currentLocationTypes.indexOf(6) !== -1 ? 'primary' : ''
                  }
                ></Chip>
                <Chip
                  label="Client"
                  size="small"
                  onDelete={handleDeleteChipClick(7)}
                  onClick={handleChipClick(7)}
                  color={
                    currentLocationTypes.indexOf(7) !== -1 ? 'primary' : ''
                  }
                ></Chip>
                <Chip
                  label="Yard After"
                  size="small"
                  onDelete={handleDeleteChipClick(8)}
                  onClick={handleChipClick(8)}
                  color={
                    currentLocationTypes.indexOf(8) !== -1 ? 'primary' : ''
                  }
                ></Chip>
              </Grid>
            </Box>

            <Grid item xs={12}>
              <Drayings
                orderBy={orderBy}
                searchBookings={searchBookings}
                currentLocationTypes={currentLocationTypes}
              />
            </Grid>
          </Grid>
        </>
      </Grid>
    </>
  )
}

// lastTrip

// lost no actions

export default withWidth()(AddTrip)
