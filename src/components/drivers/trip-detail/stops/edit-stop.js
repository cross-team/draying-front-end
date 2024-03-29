import React, { useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import CircularProgress from '@material-ui/core/CircularProgress'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/pro-light-svg-icons/'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Loading from '../../../loading'

export const GET_LOCATIONS = gql`
  query editStopsDeliveryLocations {
    deliveryLocations {
      id
      nickName
    }
  }
`

export const GET_TERMINALS = gql`
  query activeTerminalLocations {
    activeTerminalLocations {
      id
      nickName
    }
  }
`

export const UPDATE_DELIVERY_LOCATION = gql`
  mutation updateDrayingDeliveryLocation(
    $drayingId: Int!
    $deliveryLocationId: Int!
  ) {
    updateDrayingDeliveryLocation(
      drayingId: $drayingId
      deliveryLocationId: $deliveryLocationId
    ) {
      success
      message
      updatedId
    }
  }
`

export const UPDATE_TERMINAL = gql`
  mutation updateDrayingReturnTerminal(
    $drayingId: Int!
    $returnTerminalId: Int!
  ) {
    updateDrayingReturnTerminal(
      drayingId: $drayingId
      returnTerminalId: $returnTerminalId
    ) {
      success
      message
      updatedId
    }
  }
`

export const UPDATE_STOP = gql`
  mutation updateExtraStop(
    $extraStopId: Int!
    $drayingId: Int!
    $deliveryLocationId: Int!
  ) {
    updateExtraStop(
      extraStopId: $extraStopId
      drayingId: $drayingId
      deliveryLocationId: $deliveryLocationId
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
  formControl: {
    width: '100%',
    margin: 'auto',
    marginTop: theme.spacing(2),
  },
  toolbar: {
    width: '100%',
    padding: '0px',
  },
  button: {
    marginRight: theme.spacing(2),
  },
}))

const EditStop = ({
  stop,
  stopLocation,
  setEdit,
  isDL,
  isTerminal,
  setIsDL,
  setIsTerminal,
  drayingId,
}) => {
  const classes = useStyles()
  const inputLabel = React.useRef(null)
  const [labelWidth, setLabelWidth] = useState(0)
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  const [location, setLocation] = useState(parseInt(stopLocation.id))
  const [saving, setSaving] = useState(false)

  const { loading: loadingLocations, data: locationData } = useQuery(
    GET_LOCATIONS,
  )
  const { loading: loadingTerminals, data: terminalData } = useQuery(
    GET_TERMINALS,
  )

  let data
  let loading = true
  if (isTerminal && loadingTerminals !== undefined) {
    data = terminalData
    loading = loadingTerminals
  } else if (loadingLocations !== undefined) {
    data = locationData
    loading = loadingLocations
  }

  const [updateDrayingReturnTerminal] = useMutation(UPDATE_TERMINAL, {
    refetchQueries: ['allDriverRoutes', 'getSelectedTrip', 'currentTrip'],
    onCompleted: () => {
      setEdit(false)
      setIsTerminal(false)
      setIsDL(false)
    },
    awaitRefetchQueries: true,
  })
  const [updateExtraStop] = useMutation(UPDATE_STOP, {
    refetchQueries: ['allDriverRoutes', 'getSelectedTrip', 'currentTrip'],
    onCompleted: () => {
      setEdit(false)
      setIsTerminal(false)
      setIsDL(false)
    },
    awaitRefetchQueries: true,
  })
  const [updateDrayingDeliveryLocation] = useMutation(
    UPDATE_DELIVERY_LOCATION,
    {
      refetchQueries: ['allDriverRoutes', 'getSelectedTrip', 'currentTrip'],
      onCompleted: () => {
        setEdit(false)
        setIsTerminal(false)
        setIsDL(false)
      },
      awaitRefetchQueries: true,
    },
  )

  const handleChange = event => {
    setLocation(event.target.value)
  }

  const handleSave = () => {
    setSaving(true)
    if (isTerminal) {
      updateDrayingReturnTerminal({
        variables: {
          drayingId: parseInt(drayingId),
          returnTerminalId: parseInt(location),
        },
      })
    } else if (isDL) {
      updateDrayingDeliveryLocation({
        variables: {
          drayingId: parseInt(drayingId),
          deliveryLocationId: parseInt(location),
        },
      })
    } else {
      updateExtraStop({
        variables: {
          extraStopId: parseInt(stop.id),
          drayingId: parseInt(drayingId),
          deliveryLocationId: parseInt(location),
        },
      })
    }
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Grid
            container
            justify="space-between"
            alignItems="center"
            wrap="nowrap"
          >
            <Grid container justify="flex-start" alignItems="center">
              <IconButton
                onClick={() => {
                  setEdit(false)
                  setIsTerminal(false)
                }}
              >
                <FontAwesomeIcon
                  className={classes.headerText}
                  icon={faChevronLeft}
                />
              </IconButton>
              <Typography className={classes.headerText}>Edit Stop</Typography>
            </Grid>
            {saving ? (
              <CircularProgress color="secondary" />
            ) : (
              <Button
                className={classes.button}
                variant="contained"
                onClick={handleSave}
              >
                APPLY
              </Button>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid className={classes.details}>
        <FormControl className={classes.formControl} variant="outlined">
          <InputLabel ref={inputLabel}>
            Edit {isTerminal ? 'Terminal' : 'Stop'}
          </InputLabel>
          <Select
            value={location}
            onChange={handleChange}
            labelWidth={labelWidth}
          >
            {!loading && data !== undefined ? (
              data[
                isTerminal ? 'activeTerminalLocations' : 'deliveryLocations'
              ].map(loc => (
                <MenuItem key={loc.id} value={parseInt(loc.id)}>
                  {loc.nickName}
                </MenuItem>
              ))
            ) : (
              <Typography>
                <Loading />
              </Typography>
            )}
          </Select>
        </FormControl>
      </Grid>
    </>
  )
}

export default EditStop
