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
  Chip,
  TextField,
  FormControl,
  InputLabel,
  Select,
} from '@material-ui/core/'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faArrowRight, faTimes, faCircle, faEllipsisV } from '@fortawesome/pro-light-svg-icons/'
import { faCircle as faCircleFull } from '@fortawesome/pro-solid-svg-icons/'
import { useMutation, useQuery, useApolloClient } from '@apollo/react-hooks'
import gql from 'graphql-tag'

export const UPDATE_DRAYING_FIELDS = gql`
  mutation updateDrayingFields($drayingId: Int, $drayingFields: [DrayingFieldsInput]) {
    updateDrayingFields(drayingId: $drayingId, drayingFields: $drayingFields) {
      success
      errors {
        success
        message
        updatedId
      }
    }
  }
`

export const GET_DROPDOWN_OPTIONS = gql`
  query allDropdowns {
    containerSizes {
      name
      size
    }
    containerTypes {
      name
      shortName
    }
    deliveryLocations {
      nickName
    }
  }
`

const addZero = ( value ) => {
  let newValue = value.toString()
  if (newValue.length === 1) {
    newValue = "0" + newValue
  }
  return newValue
}

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
  },
  formControl: {
    width: '100%',
  }
}))

const ContainerPanel = ({ draying }) => {
  const classes = useStyles()
  const client = useApolloClient()
  const [updateDrayingFields, { data }] = useMutation(UPDATE_DRAYING_FIELDS)
  const { loading, error, data: dropdownData } = useQuery(GET_DROPDOWN_OPTIONS)

  const [anchorEl, setAnchorEl] = useState(null)
  const [edit, setEdit] = useState(false)
  const [saving, setSaving] = useState(false)

  const cutOffDateObject = draying.cutOffDate ? new Date(draying.cutOffDate) : new Date()
  const cutOffDateString = `${addZero(cutOffDateObject.getMonth() + 1)}/${addZero(cutOffDateObject.getMonth())}/${cutOffDateObject.getFullYear()}`

  const fieldReducer = (state, { type, field, value }) => {
    debugger
    switch (type) {
      case 'update':
        return {
          ...state,
          [field]: value
        }
      case 'cancel':
        return {
          booking: draying.booking,
          count: draying.container,
          cutOffDate: cutOffDateString,
          size: draying.containerSize.name,
          type: draying.containerType.name,
        }
      default:
        throw new Error(`Unhandled action: ${type}`)
    }
  }

  const [fieldValues, dispatch] = React.useReducer(fieldReducer, {
    booking: draying.booking,
    containerNum: draying.container,
    cutOffDate: cutOffDateString,
    size: draying.containerSize.name,
    type: draying.containerType.name,
  })
  const update = (field, value) => dispatch({ type: 'update', field, value})
  const cancel = () => dispatch({ type: 'cancel' })

  const handleChange = field => event => {
    debugger
    update(field, event.target.value)
  }

  const handleDateChange = date => {
    setSelectedDate(date);
  };
  
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
    cancel()
  }

  const content = (
    <>
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
          <Typography>{draying.cutOffDate && draying.cutOffDate.slice(0, 10)}</Typography>
          <Typography>{draying.portStatus.name}</Typography>
        </div>
      </Card>
    </>
  )

  const contentEdit = (
    <>
      <Card className={classes.card}>
        <div className={classes.cardRow}>
          <TextField label='Container #' variant="outlined" value={fieldValues.containerNum} onChange={handleChange('containerNum')} />
          <Typography>{draying.priority}</Typography>
        </div>
        <TextField label="Container's Booking #" variant="outlined" value={fieldValues.booking} onChange={handleChange('booking')} />
        <div className={classes.cardRow}>
          <FormControl className={classes.formControl}>
            <InputLabel>Size (Ft)</InputLabel>
            <Select value={fieldValues.size} onChange={handleChange('size')}>
              {!loading ? (dropdownData && dropdownData.containerSizes.map((size) =>
                <MenuItem key={size.name} value={size.name}>{size.name}</MenuItem>            
              )) : <Typography>Loading...</Typography>}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select value={fieldValues.type} onChange={handleChange('type')}>
              {!loading ? (dropdownData && dropdownData.containerTypes.map((type) =>
                <MenuItem key={type.name}value={type.name}>{type.name}</MenuItem>            
              )) : <Typography>Loading...</Typography>}
            </Select>
          </FormControl>
        </div>
        <div className={classes.cardRow}>
          <Typography>{draying.loadType.name}</Typography>
          <Typography>{draying.portStatus.name}</Typography>
        </div>
        <div className={classes.cardRow}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="mm/dd/yyyy"
              label="Cut Off Date"
              value={fieldValues.cutOffDate}
              InputLabelProps={{ shrink: true }}
            />
          </MuiPickersUtilsProvider>
          <Typography>{draying.deliveryLocation.locationType.name}</Typography>
        </div>
      </Card>
    </>
  )

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
        { edit ? contentEdit : content }
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