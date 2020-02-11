import React, { useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Alert from '@material-ui/lab/Alert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faChevronLeft } from '@fortawesome/pro-light-svg-icons/'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import AllAppointments from './all-appointments'
import AddOrEdit from './add-or-edit'

export const ADD_APPOINTMENT = gql`
  mutation addDrayingAppointment(
    $AddDrayingAppointmentInput: AddDrayingAppointmentInput
  ) {
    addDrayingAppointment(
      AddDrayingAppointmentInput: $AddDrayingAppointmentInput
    ) {
      success
      message
      updatedId
    }
  }
`
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

const AppointmentsPanel = ({ draying }) => {
  const classes = useStyles()
  const [view, setView] = useState('all')
  const [argument, setArgument] = useState({})

  const [
    addDrayingAppointment,
    { loading: addLoading, error: addError, data: addData },
  ] = useMutation(ADD_APPOINTMENT, {
    refetchQueries: ['allDriverRoutes', 'getSelectedTrip', 'currentTrip'],
    onCompleted: () => {
      addComplete(false)
    },
    awaitRefetchQueries: true,
  })

  const addComplete = () => {}

  const handleSave = () => {
    if (view === 'add') {
      addDrayingAppointment({ variables: argument })
    }
    if (view === 'edit') {
    }
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Grid
              item
              container
              xs={6}
              justify="flex-start"
              alignItems="center"
            >
              {view !== 'all' && (
                <IconButton onClick={() => setView('all')}>
                  <FontAwesomeIcon
                    className={classes.headerText}
                    icon={faChevronLeft}
                  />
                </IconButton>
              )}
              <Typography className={classes.headerText}>
                Appointments
              </Typography>
            </Grid>
            <Grid item container xs={6} justify="flex-end">
              {view === 'all' && (
                <IconButton onClick={() => setView('add')}>
                  <FontAwesomeIcon
                    className={classes.headerText}
                    icon={faPlus}
                  />
                </IconButton>
              )}
              {!addLoading && (view === 'add' || view === 'edit') && (
                <Button
                  className={classes.button}
                  variant="contained"
                  onClick={handleSave}
                >
                  DONE
                </Button>
              )}
              {addLoading && <CircularProgress color="secondary" />}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid className={classes.details}>
        {view === 'all' && (
          <AllAppointments draying={draying} setView={setView} />
        )}
        {(view === 'add' || view === 'edit') && (
          <AddOrEdit draying={draying} view={view} setArgument={setArgument} />
        )}
      </Grid>
      {addData && !addData.addDrayingAppointment.success && (
        <Alert severity="error">{addData.addDrayingAppointment.message}</Alert>
      )}
      {addError && <Alert severity="error">Error</Alert>}
    </>
  )
}

export default AppointmentsPanel
