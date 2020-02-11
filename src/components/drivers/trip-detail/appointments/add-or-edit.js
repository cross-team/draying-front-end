import React, { useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

const useStyles = makeStyles(theme => ({
  input: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
}))

const fieldReducer = (state, { type, field, value }) => {
  switch (type) {
    case 'updateField':
      return {
        ...state,
        [field]: value,
      }
    default:
      throw new Error(`Unhandled action: ${type}`)
  }
}

const AddOrEdit = ({ draying, view, setArgument }) => {
  const classes = useStyles()
  const [fieldValues, dispatch] = React.useReducer(fieldReducer, {
    stop: '',
    type: '',
    dateTime: new Date(),
    note: '',
  })

  const updateField = field => event => {
    const value = event.target.value
    dispatch({ type: 'updateField', field, value })
    if (view === 'add') {
      setArgument({
        drayingId: 0,
        extraStopId: 0,
        appointmentTypeId: 0,
        appointmentLocationTypeId: 0,
        appointmentDate: '',
        appointmentTime: '',
        note: '',
      })
    }
  }

  const updateDateTime = value => {
    dispatch({ type: 'updateField', field: 'dateTime', value: value })
  }

  console.log(draying.appointments)

  const stops = () => {
    const menuItems = []
    const locationIds = []
    draying.deliveryLocation && locationIds.push(draying.deliveryLocation.id)
    draying.deliveryLocation &&
      menuItems.push(
        <MenuItem value={+draying.deliveryLocation.id}>
          {draying.deliveryLocation.nickName}
        </MenuItem>,
      )
    draying.extraStops.map(stop => {
      if (locationIds.indexOf(stop.deliveryLocation.id) === -1) {
        locationIds.push(stop.deliveryLocation.id)
        menuItems.push(
          <MenuItem value={+stop.deliveryLocation.id}>
            {stop.deliveryLocation.nickName}
          </MenuItem>,
        )
      }
      return null
    })
    draying.returnTerminal &&
      menuItems.push(
        <MenuItem value={+draying.returnTerminal.id}>
          {draying.returnTerminal.nickName}
        </MenuItem>,
      )
    return menuItems
  }

  const queryData = [
    { id: '1', name: 'Type 1' },
    { id: '2', name: 'Type 2' },
  ]

  const types = queryData.map(type => (
    <MenuItem value={+type.id}>{type.name}</MenuItem>
  ))

  return (
    <>
      <Typography>{view === 'add' ? 'Add' : 'Edit'} Appointment</Typography>
      <FormControl className={classes.input} variant="outlined">
        <InputLabel>Stop</InputLabel>
        <Select value={fieldValues.stop} onChange={updateField('stop')}>
          {stops()}
        </Select>
      </FormControl>
      <FormControl className={classes.input} variant="outlined">
        <InputLabel>Appointment Type</InputLabel>
        <Select value={fieldValues.type} onChange={updateField('type')}>
          {types}
        </Select>
      </FormControl>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDateTimePicker
          variant="inline"
          inputVariant="outlined"
          format="yyyy/MM/dd HH:mm"
          label="Date & Time"
          disablePast
          InputLabelProps={{ shrink: true }}
          className={classes.input}
          value={fieldValues.dateTime}
          onChange={updateDateTime}
        />
      </MuiPickersUtilsProvider>
      <TextField
        variant="outlined"
        multiline
        label="Note"
        value={fieldValues.note}
        onChange={updateField('note')}
        className={classes.input}
      />
    </>
  )
}

export default AddOrEdit
