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
import Collapse from '@material-ui/core/Collapse'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/pro-light-svg-icons/'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import PriceFields from './price-fields'
import Loading from '../../../loading'

import { Helmet } from 'react-helmet'

export const GET_LOCATIONS = gql`
  query addStopDeliveryLocations {
    deliveryLocations {
      __typename
      id
      nickName
    }
  }
`

export const ADD_STOP = gql`
  mutation addDrayingExtraStop(
    $extraStopsAndPrices: AddDrayingExtraStopInput!
  ) {
    addDrayingExtraStop(extraStopsAndPrices: $extraStopsAndPrices) {
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

const AddStop = ({ setAddS, setAddL, draying }) => {
  const classes = useStyles()
  const inputLabel = React.useRef(null)
  const [labelWidth, setLabelWidth] = useState(0)
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  const [selectedLocation, setLocation] = useState('create')
  const [tripActions, setTripActions] = useState([])
  const [saving, setSaving] = useState(false)

  const { loading, error, data } = useQuery(GET_LOCATIONS)
  const [addDrayingExtraStop] = useMutation(ADD_STOP, {
    refetchQueries: ['allDriverRoutes', 'getSelectedTrip', 'currentTrip'],
    onCompleted: () => {
      setAddS(false)
    },
    awaitRefetchQueries: true,
  })

  const handleChange = event => {
    setLocation(event.target.value)
  }

  const handlePriceChange = actionId => event => {
    const newTripActions = tripActions.map(action => {
      if (action.tripActionId === actionId) {
        return {
          ...action,
          price: +event.target.value,
        }
      }
      return action
    })
    setTripActions(newTripActions)
  }

  const handleSave = () => {
    if (selectedLocation === 'create') {
      setAddL(true)
    } else {
      setSaving(true)
      addDrayingExtraStop({
        variables: {
          extraStopsAndPrices: {
            extraStops: [
              {
                drayingId: +draying.id,
                deliveryLocationId: selectedLocation,
              },
            ],
            tripActionPrices: tripActions,
          },
        },
      })
    }
  }

  return (
    <>
      <Helmet>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCwLTFeBJLrgR7zOb3zbBwRFVWOLZJO0Tw&libraries=places"></script>
      </Helmet>
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
                  setAddS(false)
                }}
              >
                <FontAwesomeIcon
                  className={classes.headerText}
                  icon={faChevronLeft}
                />
              </IconButton>
              <Typography className={classes.headerText}>Add Stop</Typography>
            </Grid>
            {saving ? (
              <CircularProgress color="secondary" />
            ) : (
              <Button
                className={classes.button}
                variant="contained"
                onClick={handleSave}
              >
                DONE
              </Button>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid className={classes.details}>
        {error ? (
          <Typography>Error</Typography>
        ) : (
          <>
            <FormControl className={classes.formControl} variant="outlined">
              <InputLabel ref={inputLabel}>Add Stop</InputLabel>
              <Select
                value={selectedLocation}
                onChange={handleChange}
                labelWidth={labelWidth}
              >
                <MenuItem value="create">Create New Location</MenuItem>
                {!loading && data !== undefined ? (
                  data.deliveryLocations.map(loc => (
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
            <Collapse in={selectedLocation !== 'create'}>
              {selectedLocation !== 'create' && (
                <PriceFields
                  drayingId={draying.id}
                  locationId={selectedLocation}
                  tripActions={tripActions}
                  setTripActions={setTripActions}
                  handlePriceChange={handlePriceChange}
                />
              )}
            </Collapse>
          </>
        )}
      </Grid>
    </>
  )
}

export default AddStop
