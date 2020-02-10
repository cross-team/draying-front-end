import React, { useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import CircularProgress from '@material-ui/core/CircularProgress'
import CloseIcon from '@material-ui/icons/Close'
import EditIcon from '@material-ui/icons/Edit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/pro-light-svg-icons/'

const useStyles = makeStyles(theme => ({
  headerText: {
    color: theme.palette.primary.contrastText,
  },
  details: {
    margin: theme.spacing(1),
  },
  input: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
}))

const AllAppointments = ({ draying }) => {
  const classes = useStyles()
  const [saving, setSaving] = useState(false)
  const appointments = draying.appointments.map((appointment, index) => {
    const date = new Date(
      `${appointment.appointmentDate.substring(0, 10)}${
        appointment.appointmentTime ? 'T' + appointment.appointmentTime : ''
      }`,
    )
    return (
      <TextField
        className={classes.input}
        key={index}
        variant="outlined"
        label={`${appointment.type.shortName}-${
          appointment.locationType.name
            ? `${appointment.locationType.name}`
            : ''
        }`}
        value={`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}${
          appointment.appointmentTime
            ? ` ${date.getHours()}:${
                date.getMinutes().length > 1
                  ? date.getMinutes()
                  : `0${date.getMinutes()}`
              }`
            : ''
        }`}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  // setSelectedStop(stop)
                  // setEdit(stop.deliveryLocation)
                }}
              >
                <EditIcon />
              </IconButton>
              {saving ? (
                <CircularProgress color="secondary" />
              ) : (
                <IconButton onClick={() => {}}>
                  <CloseIcon />
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
      ></TextField>
    )
  })

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Typography className={classes.headerText}>Appointments</Typography>
            <div>
              <IconButton onClick={() => {}}>
                <FontAwesomeIcon className={classes.headerText} icon={faPlus} />
              </IconButton>
            </div>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid className={classes.details}>{appointments}</Grid>
    </>
  )
}

export default AllAppointments
