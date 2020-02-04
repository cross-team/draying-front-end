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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/pro-light-svg-icons/'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

export const GET_LOCATIONS = gql`
  query deliveryLocations {
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
  formControl: {
    width: '100%',
    margin: 'auto',
  },
  toolbar: {
    width: '100%',
    padding: '0px',
  },
  button: {
    marginRight: theme.spacing(2),
  },
}))

const StopsPanel = ({ stop, setEdit, isTerminal, setIsTerminal }) => {
  console.log(stop)
  const classes = useStyles()
  const inputLabel = React.useRef(null)
  const [labelWidth, setLabelWidth] = useState(0)
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  const [location, setLocation] = useState(parseInt(stop.id))

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

  const handleChange = event => {
    setLocation(event.target.value)
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
                  setEdit('')
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
            <Button className={classes.button} variant="contained">
              APPLY
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid className={classes.details}>
        <FormControl className={classes.formControl} variant="outlined">
          <InputLabel ref={inputLabel}>Edit Stop</InputLabel>
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
              <Typography>Loading...</Typography>
            )}
          </Select>
        </FormControl>
      </Grid>
    </>
  )
}

export default StopsPanel
