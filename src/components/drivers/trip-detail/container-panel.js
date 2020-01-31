import React, { useState, useEffect } from 'react'
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
  CircularProgress,
} from '@material-ui/core/'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheck,
  faArrowRight,
  faTimes,
  faCircle,
  faEllipsisV,
} from '@fortawesome/pro-light-svg-icons/'
import { faCircle as faCircleFull } from '@fortawesome/pro-solid-svg-icons/'
import { useMutation, useQuery, useApolloClient } from '@apollo/react-hooks'
import gql from 'graphql-tag'

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

const addZero = value => {
  let newValue = value.toString()
  if (newValue.length === 1) {
    newValue = '0' + newValue
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
  cardRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stopContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  headerIcons: {
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
    margin: theme.spacing(1),
  },
  editContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))

const ContainerPanel = ({ draying }) => {
  const classes = useStyles()
  const client = useApolloClient()
  const [updateDrayingFields, { data }] = useMutation(UPDATE_DRAYING_FIELDS)
  const { loading, error, data: dropdownData } = useQuery(GET_DROPDOWN_OPTIONS)
  dropdownData && console.log(dropdownData)
  const [anchorEl, setAnchorEl] = useState(null)
  const [edit, setEdit] = useState(false)
  const [saving, setSaving] = useState(false)
  console.log(draying.cutOffDate)
  const cutOffDateObject = draying.cutOffDate
    ? new Date(draying.cutOffDate)
    : new Date()
  const cutOffDateString = `${addZero(
    cutOffDateObject.getMonth() + 1,
  )}/${addZero(cutOffDateObject.getMonth())}/${cutOffDateObject.getFullYear()}`

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
    size: draying.containerSize.id,
    type: draying.containerType.id,
  })
  const update = (field, value) => dispatch({ type: 'update', field, value })
  const cancel = () => dispatch({ type: 'cancel' })

  useEffect(() => {
    update('booking', draying.booking)
    update('containerNum', draying.container)
    update('cutOffDate', cutOffDateString)
    update('size', draying.containerSize.name)
    update('type', draying.containerType.name)
  }, [draying, cutOffDateString])

  /*
  const writeToCache = data => {
    if (data && data.updateDrayingFields.success) {
      client.writeFragment({
        id: `${draying.id}`,
        fragment: gql`
          fragment currentDraying on Draying {
            booking
            container
            containerSize {
              id
              name
            }
            containerType {
              id
              name
            }
          }
        `,
        data: {
          booking: fieldValues.booking,
          container: fieldValues.containerNum,
          containerSize: {
            id: fieldValues.size,
            name: dropdownData.containerSizes[fieldValues.size - 1].name,
            __typename: 'ContainerSize',
          },
          containerType: {
            id: fieldValues.type,
            name: dropdownData.containerTypes[fieldValues.type - 1].name,
            __typename: 'ContainerType',
          },
          __typename: 'Draying',
        },
      })
      setSaving(false)
      setEdit(false)
    }
  }

  useEffect(() => writeToCache(data), [data, writeToCache])
  */

  const handleSave = () => {
    setSaving(true)
    updateDrayingFields({
      variables: {
        drayingId: parseInt(draying.id),
        drayingFields: [
          { field: 'booking', value: fieldValues.booking },
          { field: 'container', value: fieldValues.containerNum },
          { field: 'containerSize', value: fieldValues.size },
          { field: 'containerType', value: fieldValues.type },
        ],
      },
    })
  }

  const handleChange = field => event => {
    update(field, event.target.value)
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
        <div className={classes.cardRow}>
          <div>
            <Typography>
              {draying.loadType.name === 'Export'
                ? `${draying.container} | ${draying.booking}`
                : draying.container}
            </Typography>
            <Typography variant="caption">{`${draying.containerSize.name}, ${draying.containerType.name}`}</Typography>
          </div>
          <div>
            <Typography>{draying.priority}</Typography>
            <Typography>
              {draying.deliveryLocation.locationType.name}
            </Typography>
          </div>
        </div>
        <div className={classes.cardRow}>
          <Typography>{draying.loadType.name}</Typography>
          <Typography>
            {draying.cutOffDate && draying.cutOffDate.slice(0, 10)}
          </Typography>
          <Typography>{draying.portStatus.name}</Typography>
        </div>
      </Card>
    </>
  )

  const contentEdit = (
    <>
      <div className={classes.editContainer}>
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
            {!loading ? (
              dropdownData &&
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
          <Select value={fieldValues.type} onChange={handleChange('type')}>
            {!loading ? (
              dropdownData &&
              dropdownData.containerTypes.map(type => (
                <MenuItem key={type.id} value={type.id}>
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
            format="dd/MM/yyyy"
            label="Cut Off Date"
            value={fieldValues.cutOffDate}
            InputLabelProps={{ shrink: true }}
            className={classes.formControl}
          />
        </MuiPickersUtilsProvider>
      </div>
    </>
  )

  return (
    <>
      <AppBar position="static">
        <Toolbar className={classes.header}>
          <Typography className={classes.headerText}>Container</Typography>
          <div className={classes.headerIcons}>
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
        {edit ? contentEdit : content}
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
      </div>
    </>
  )
}

export default ContainerPanel
