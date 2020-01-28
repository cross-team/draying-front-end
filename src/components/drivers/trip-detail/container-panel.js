import React from 'react'
import {
  makeStyles,
  Typography,
  IconButton,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Card,
  Menu,
  MenuItem,
  Chip
} from '@material-ui/core/'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faArrowRight, faPencil, faCircle } from '@fortawesome/pro-light-svg-icons/'
import { faCircleFull } from '@fortawesome/pro-solid-svg-icons/faCircle'

const useStyles = makeStyles(theme => ({
  summary: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  summaryPanel: {
    backgroundColor: theme.palette.primary.main,
  },
  summaryText: {
    color: theme.palette.primary.contrastText
  },
  details: {
    width: '100%'
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
  }
}))

const ContainerPanel = ({ draying }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleClose = event => {
    event.stopPropagation()
    setAnchorEl(null)
  }

  console.log(draying.appointments)

  return (
    <ExpansionPanel defaultExpanded={true}>
      <ExpansionPanelSummary className={classes.summaryPanel}> 
        <div className={classes.summary}>
          <Typography className={classes.summaryText}>Container</Typography>
          <div>
            <IconButton
              onClick={handleClick}
              onFocus={event => event.stopPropagation()}
            >
              <FontAwesomeIcon className={classes.summaryText} icon={faPlus} />
            </IconButton>
            <IconButton
              onClick={handleClick}
              onFocus={event => event.stopPropagation()}
            >
              <FontAwesomeIcon className={classes.summaryText} icon={faPencil} />
            </IconButton>
          </div>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Add Appointment</MenuItem>
            <MenuItem onClick={handleClose}>Add Stop</MenuItem>
            <MenuItem onClick={handleClose}>Add Alert</MenuItem>
            <MenuItem onClick={handleClose}>Add Cost</MenuItem>
          </Menu>
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div className={classes.details}>
          <Card className={classes.card}>
            <div className={classes.cardRow}>
              <div>
                <Typography>{draying.container}</Typography>
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
          <div>
            <Typography>To Dispatch</Typography>
          </div>
          <div>
            <Typography>Yard Before</Typography>
          </div>
          <div>
            <Typography>Client</Typography>
          </div>
          <div>
            <Typography>Yard After</Typography>
          </div>
          <div>
            <Typography>Completed</Typography>
          </div>
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default ContainerPanel