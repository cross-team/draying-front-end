import React, { useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faChevronLeft } from '@fortawesome/pro-light-svg-icons/'
import AllAppointments from './all-appointments'
import AddOrEdit from './add-or-edit'

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
              {(view === 'add' || view === 'edit') && (
                <Button
                  className={classes.button}
                  variant="contained"
                  onClick={() => {}}
                >
                  DONE
                </Button>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid className={classes.details}>
        {view === 'all' && (
          <AllAppointments draying={draying} setView={setView} />
        )}
        {(view === 'add' || view === 'edit') && (
          <AddOrEdit draying={draying} view={view} />
        )}
      </Grid>
    </>
  )
}

export default AppointmentsPanel
