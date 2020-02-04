import React, { useState, useEffect } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Card from '@material-ui/core/Card'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheck,
  faTimes,
  faEllipsisV,
} from '@fortawesome/pro-light-svg-icons/'
// import { faCircle as faCircleFull } from '@fortawesome/pro-solid-svg-icons/'
import { useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import format from 'date-fns/format'
import formatISO from 'date-fns/formatISO'

export const UPDATE_DRAYING_FIELDS = gql`
  mutation updateDrayingFields(
    $drayingId: Int
    $drayingFields: [DrayingFieldsInput]
  ) {
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
      id
      name
      size
    }
    containerTypes {
      id
      name
      shortName
    }
    deliveryLocations {
      nickName
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
  card: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  margin: {
    margin: theme.spacing(1),
  },
  formControl: {
    width: '100%',
    margin: theme.spacing(1),
  },
  rightContainer: {
    width: '36%',
  },
  priorityContainer: {
    width: '100%',
    backgroundColor: theme.palette.danger.light,
    marginBottom: theme.spacing(1),
  },
  locationTypeContainer: {
    width: '100%',
    backgroundColor: '#f0f0f0',
  },
  tabText: {
    color: '#979797',
    marginRight: theme.spacing(1),
  },
}))

const ContainerPanel = ({ draying }) => {
  const classes = useStyles()
  const [updateDrayingFields] = useMutation(UPDATE_DRAYING_FIELDS, {
    refetchQueries: ['allDriversCapacity', 'allDriverRoutes', 'currentTrip'],
    onCompleted: () => {
      setSaving(false)
      setEdit(false)
    },
    awaitRefetchQueries: true,
  })
  const { loading, data: dropdownData } = useQuery(GET_DROPDOWN_OPTIONS)

  const [anchorEl, setAnchorEl] = useState(null)
  const [edit, setEdit] = useState(false)
  const [saving, setSaving] = useState(false)

  const cutOffDateObject = draying.cutOffDate
    ? new Date(draying.cutOffDate)
    : new Date()

  const fieldReducer = (state, { type, field, value }) => {
    switch (type) {
      case 'update':
        return {
          ...state,
          [field]: value,
        }
      case 'cancel':
        return {
          booking: draying.booking,
          containerNum: draying.container,
          cutOffDate: format(cutOffDateObject, 'MM/dd/yyyy'),
          size: draying.containerSize.id,
          type: draying.containerType.id,
        }
      default:
        throw new Error(`Unhandled action: ${type}`)
    }
  }

  const [fieldValues, dispatch] = React.useReducer(fieldReducer, {
    booking: draying.booking,
    containerNum: draying.container,
    cutOffDate: format(cutOffDateObject, 'MM/dd/yyyy'),
    size: draying.containerSize.id,
    type: draying.containerType.id,
  })
  const update = (field, value) => dispatch({ type: 'update', field, value })
  const cancel = () => dispatch({ type: 'cancel' })

  useEffect(() => cancel(), [draying])

  const handleSave = () => {
    setSaving(true)
    updateDrayingFields({
      variables: {
        drayingId: parseInt(draying.id),
        drayingFields: [
          { field: 'Booking', value: fieldValues.booking },
          { field: 'Container', value: fieldValues.containerNum },
          { field: 'ContainerSizeId', value: fieldValues.size.toString() },
          { field: 'ContainerTypeId', value: fieldValues.type.toString() },
          {
            field: 'CutOffDate',
            value: formatISO(new Date(fieldValues.cutOffDate)),
          },
        ],
      },
    })
  }

  const handleChange = field => event => {
    update(field, event.target.value)
  }

  const handleDateChange = date => {
    update('cutOffDate', date)
  }

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
        <Grid container justify="space-between" alignItems="center">
          <div>
            <Typography>
              {draying.loadType.name === 'Export'
                ? `${draying.container} | ${draying.booking}`
                : draying.container}
            </Typography>
            <Typography variant="caption">{`${draying.containerSize.name}, ${draying.containerType.name}`}</Typography>
          </div>
          <Grid item xs={4}>
            <Grid
              container
              className={classes.priorityContainer}
              justify="flex-end"
            >
              <Typography className={classes.tabText}>
                {draying.priority}
              </Typography>
            </Grid>
            <Grid
              container
              className={classes.locationTypeContainer}
              justify="flex-end"
            >
              <Typography className={classes.tabText}>
                {draying.deliveryLocation.locationType.name}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justify="space-between" alignItems="center">
          <Typography>{draying.loadType.name}</Typography>
          <Typography>
            {cutOffDateObject && format(cutOffDateObject, 'MM/dd/yyyy')}
          </Typography>
          <Typography>{draying.portStatus.name}</Typography>
        </Grid>
      </Card>
    </>
  )

  const contentEdit = (
    <>
      <Grid container alignItems="center" direction="column">
        <TextField
          label="Container #"
          variant="outlined"
          value={fieldValues.containerNum}
          onChange={handleChange('containerNum')}
          className={classes.formControl}
        />
        <TextField
          label="Container's Booking #"
          variant="outlined"
          value={fieldValues.booking}
          onChange={handleChange('booking')}
          className={classes.formControl}
        />
        <FormControl className={classes.formControl} variant="outlined">
          <InputLabel>Size (Ft)</InputLabel>
          <Select value={fieldValues.size} onChange={handleChange('size')}>
            {!loading && dropdownData ? (
              dropdownData.containerSizes.map(size => (
                <MenuItem key={size.id} value={size.id}>
                  {size.name}
                </MenuItem>
              ))
            ) : (
              <Typography>Loading...</Typography>
            )}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl} variant="outlined">
          <InputLabel>Type</InputLabel>
          <Select
            value={parseInt(fieldValues.type)}
            onChange={handleChange('type')}
          >
            {!loading && dropdownData ? (
              dropdownData.containerTypes.map(type => (
                <MenuItem key={type.id} value={parseInt(type.id)}>
                  {type.name}
                </MenuItem>
              ))
            ) : (
              <Typography>Loading...</Typography>
            )}
          </Select>
        </FormControl>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            variant="inline"
            inputVariant="outlined"
            format="MM/dd/yyyy"
            label="Cut Off Date"
            value={fieldValues.cutOffDate}
            onChange={date => handleDateChange(date)}
            InputLabelProps={{ shrink: true }}
            className={classes.formControl}
          />
        </MuiPickersUtilsProvider>
      </Grid>
    </>
  )

  return (
    <>
      <AppBar position="static">
        <Toolbar className={classes.header}>
          <Grid container alignItems="center" justify="space-between">
            <Typography className={classes.headerText}>Container</Typography>
            <div>
              {saving && <CircularProgress color="secondary" />}
              {edit && !saving && (
                <>
                  <IconButton onClick={handleSave}>
                    <FontAwesomeIcon
                      className={classes.headerText}
                      icon={faCheck}
                    />
                  </IconButton>
                  <IconButton onClick={handleCancel}>
                    <FontAwesomeIcon
                      className={classes.headerText}
                      icon={faTimes}
                    />
                  </IconButton>
                </>
              )}
              <IconButton onClick={handleClick}>
                <FontAwesomeIcon
                  className={classes.headerText}
                  icon={faEllipsisV}
                />
              </IconButton>
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
            </div>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.details}>
        {edit ? contentEdit : content}
        {/*
        <div className={classes.stopContainer}>
          <Typography>
            {draying.terminalLocation && draying.terminalLocation.nickName}
          </Typography>
          <div>
            <div className={classes.stop}>
              <FontAwesomeIcon icon={faArrowRight} className={classes.margin} />
              <Typography>{draying.deliveryLocation.nickName}</Typography>
            </div>
            {draying.extraStops.map(stop => (
              <div className={classes.stop}>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className={classes.margin}
                />
                <Typography>{stop.deliveryLocation.nickName}</Typography>
              </div>
            ))}
            <div className={classes.stop}>
              <FontAwesomeIcon icon={faArrowRight} className={classes.margin} />
              <Typography>
                {draying.returnTerminal && draying.returnTerminal.nickName}
              </Typography>
            </div>
          </div>
        </div>
        <Typography>Appointments</Typography>
        {draying.appointments.map(appointment => (
          <div className={classes.appointment}>
            <Chip label={appointment.type.name} />
            <Typography>{appointment.appointmentDate.slice(0, 10)}</Typography>
            <Typography>{appointment.appointmentTime}</Typography>
          </div>
        )) && <Typography variant="caption">No Appointments</Typography>}
        <Typography>Container Location History</Typography>
        <div className={classes.locationStatus}>
          {parseInt(draying.containerStage.id) <= 5 ||
          parseInt(draying.deliveryLocation.locationType.id) === 4 ||
          parseInt(draying.deliveryLocation.locationType.id) === 5 ? (
            <FontAwesomeIcon icon={faCircleFull} className={classes.margin} />
          ) : (
            <FontAwesomeIcon icon={faCircle} className={classes.margin} />
          )}
          <Typography>To Dispatch</Typography>
        </div>
        <div className={classes.locationStatus}>
          {parseInt(draying.deliveryLocation.locationType.id) === 3 ? (
            <FontAwesomeIcon icon={faCircleFull} className={classes.margin} />
          ) : (
            <FontAwesomeIcon icon={faCircle} className={classes.margin} />
          )}
          <Typography>Yard Before</Typography>
        </div>
        <div className={classes.locationStatus}>
          {parseInt(draying.deliveryLocation.locationType.id) === 2 ? (
            <FontAwesomeIcon icon={faCircleFull} className={classes.margin} />
          ) : (
            <FontAwesomeIcon icon={faCircle} className={classes.margin} />
          )}
          <Typography>Client</Typography>
        </div>
        <div className={classes.locationStatus}>
          {parseInt(draying.deliveryLocation.locationType.id) === 6 ? (
            <FontAwesomeIcon icon={faCircleFull} className={classes.margin} />
          ) : (
            <FontAwesomeIcon icon={faCircle} className={classes.margin} />
          )}
          <Typography>Yard After</Typography>
        </div>
        <div className={classes.locationStatus}>
          {parseInt(draying.containerStage.id) >= 9 ? (
            <FontAwesomeIcon icon={faCircleFull} className={classes.margin} />
          ) : (
            <FontAwesomeIcon icon={faCircle} className={classes.margin} />
          )}
          <Typography>Completed</Typography>
        </div>
          */}
      </div>
    </>
  )
}

export default ContainerPanel
