import React, { useState } from 'react'
import {
  makeStyles,
  Typography,
  IconButton,
  AppBar,
  Toolbar,
  Card,
  Menu,
  MenuItem,
  Chip
} from '@material-ui/core/'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faArrowRight, faTimes, faCircle, faEllipsisV } from '@fortawesome/pro-light-svg-icons/'
import { faCircle as faCircleFull } from '@fortawesome/pro-solid-svg-icons/'

const useStyles = makeStyles(theme => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    color: theme.palette.primary.contrastText
  },
  details: {
    margin: theme.spacing(1)
  },
  card: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  cardRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  stopContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  stop: {
    display: 'flex',
    alignItems: 'center',
  },
  appointment: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  margin: {
    margin: theme.spacing(1),
  },
  locationStatus: {
    display: 'flex',
    alignItems: 'center',
  }
}))

const ContainerPanel = ({ draying }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const [edit, setEdit] = useState(false)
  
  const handleClick = event => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleClose = event => {
    setAnchorEl(null)
  }

  const handleEdit = event => {
    setEdit(true)
    handleClose()
  }

  const handleCancel = event => {
    setEdit(false)
  }

  return (
    <>
      <AppBar position='static'>
        <Toolbar className={classes.header}>
          <Typography className={classes.headerText}>Container</Typography>
          <div>
            { edit && 
              <>
                <IconButton >
                  <FontAwesomeIcon className={classes.headerText} icon={faCheck} />
                </IconButton>
                <IconButton
                  onClick={handleCancel}
                >
                  <FontAwesomeIcon className={classes.headerText} icon={faTimes} />
                </IconButton>
              </>
            }
            <IconButton onClick={handleClick}>
              <FontAwesomeIcon className={classes.headerText} icon={faEllipsisV} />
            </IconButton>
          </div>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleClose}>Add Appointment</MenuItem>
            <MenuItem onClick={handleClose}>Add Stop</MenuItem>
            <MenuItem onClick={handleClose}>Add Alert</MenuItem>
            <MenuItem onClick={handleClose}>Add Cost</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
        <div className={classes.details}>
          <Card className={classes.card}>
            <div className={classes.cardRow}>
              <div>
                <Typography>{draying.loadType.name === 'Export' ? `${draying.container} | ${draying.booking}` : draying.container}</Typography>
                <Typography variant='caption'>{`${draying.containerSize.name}, ${draying.containerType.name}`}</Typography>
              </div>
              <div>
                <Typography>{draying.priority}</Typography>
                <Typography>{draying.deliveryLocation.locationType.name}</Typography>
              </div>
            </div>
            <div className={classes.cardRow}>
              <Typography>{draying.loadType.name}</Typography>
              <Typography>{draying.cutOffDate}</Typography>
              <Typography>{draying.portStatus.name}</Typography>
            </div>
          </Card>
          <div className={classes.stopContainer}>
            <Typography>{draying.terminalLocation && draying.terminalLocation.nickName}</Typography>
            <div>
              <div className={classes.stop}>
                <FontAwesomeIcon icon={faArrowRight} className={classes.margin} />
                <Typography>{draying.deliveryLocation.nickName}</Typography>
              </div>
              {draying.extraStops.map((stop) => (
                <div className={classes.stop}>
                  <FontAwesomeIcon icon={faArrowRight} className={classes.margin} />
                  <Typography>{stop.deliveryLocation.nickName}</Typography>
                </div>
              ))}
              <div className={classes.stop}>
                <FontAwesomeIcon icon={faArrowRight} className={classes.margin} />
                <Typography>{draying.returnTerminal && draying.returnTerminal.nickName}</Typography>
              </div>
            </div>
          </div>
          <Typography>Appointments</Typography>
          {draying.appointments.map((appointment) => (
            <div className={classes.appointment}>
              <Chip label={appointment.type.name} />
              <Typography>{appointment.appointmentDate.slice(0, 10)}</Typography>
              <Typography>{appointment.appointmentTime}</Typography>
            </div>
          )) && <Typography variant='caption'>No Appointments</Typography>}
          <Typography>Container Location History</Typography>
          <div className={classes.locationStatus}>
            {(parseInt(draying.containerStage.id) <= 5 || parseInt(draying.deliveryLocation.locationType.id) === 4 || parseInt(draying.deliveryLocation.locationType.id) === 5) ?
              <FontAwesomeIcon icon={faCircleFull} className={classes.margin} /> :
              <FontAwesomeIcon icon={faCircle} className={classes.margin} />}
            <Typography>To Dispatch</Typography>
          </div>
          <div className={classes.locationStatus}>
            {parseInt(draying.deliveryLocation.locationType.id) === 3 ? <FontAwesomeIcon icon={faCircleFull} className={classes.margin} /> :
              <FontAwesomeIcon icon={faCircle} className={classes.margin} />}
            <Typography>Yard Before</Typography>
          </div>
          <div className={classes.locationStatus}>
            {parseInt(draying.deliveryLocation.locationType.id) === 2 ? <FontAwesomeIcon icon={faCircleFull} className={classes.margin} /> :
              <FontAwesomeIcon icon={faCircle} className={classes.margin} />}
            <Typography>Client</Typography>
          </div>
          <div className={classes.locationStatus}>
            {parseInt(draying.deliveryLocation.locationType.id) === 6 ? <FontAwesomeIcon icon={faCircleFull} className={classes.margin} /> :
              <FontAwesomeIcon icon={faCircle} className={classes.margin} />}
            <Typography>Yard After</Typography>
          </div>
          <div className={classes.locationStatus}>
            {parseInt(draying.containerStage.id) >= 9 ? <FontAwesomeIcon icon={faCircleFull} className={classes.margin} /> :
              <FontAwesomeIcon icon={faCircle} className={classes.margin} />}
            <Typography>Completed</Typography>
          </div>
        </div>
    </>
  )
}

export default ContainerPanel