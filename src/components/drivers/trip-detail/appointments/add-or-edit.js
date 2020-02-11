import React, { useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import CircularProgress from '@material-ui/core/CircularProgress'
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

const AddOrEdit = ({ draying, view }) => {
  const classes = useStyles()
  const [stop, setStop] = useState('')
  const [type, setType] = useState('')
  const [dateTime, setDateTime] = useState('')
  const [note, setNote] = useState('')

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

  return (
    <>
      <Typography>{view === 'add' ? 'Add' : 'Edit'} Appointment</Typography>
      <FormControl className={classes.input} variant="outlined">
        <InputLabel>Stop</InputLabel>
        <Select value={stop}>{stops()}</Select>
      </FormControl>
      <FormControl className={classes.input} variant="outlined">
        <InputLabel>Appointment Type</InputLabel>
        <Select value={type}></Select>
      </FormControl>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDateTimePicker
          variant="inline"
          inputVariant="outlined"
          format="yyyy/MM/dd HH:mm"
          label="Date & Time"
          InputLabelProps={{ shrink: true }}
          className={classes.input}
        />
      </MuiPickersUtilsProvider>
      <TextField
        variant="outlined"
        multiline
        label="Note"
        value={note}
        className={classes.input}
      />
    </>
  )
}

export default AddOrEdit
