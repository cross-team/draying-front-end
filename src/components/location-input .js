import React, { useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete'

const useStyles = makeStyles(theme => ({
  input: {
    marginTop: theme.spacing(2),
    width: '100%',
  },
}))

const LocationInput = ({ updateLocation, appendCoordinates }) => {
  const classes = useStyles()
  const [address, setAddress] = useState('')

  const handleChange = addr => {
    console.log(addr)
    setAddress(addr)
  }

  const handleSelect = addr => {
    handleChange(addr)
    geocodeByAddress(addr)
      .then(results => {
        updateLocation(results[0])
        return getLatLng(results[0])
      })
      .then(latLng => {
        console.log('Success', latLng)
        appendCoordinates(latLng)
      })
      .catch(error => console.error('Error', error))
  }

  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <Grid container>
          <TextField
            className={classes.input}
            variant="outlined"
            label="Location Address"
            value={address}
            inputProps={{
              ...getInputProps({
                className: 'location-search-input',
              }),
            }}
          />
          <Grid container direction="column">
            {loading && <Typography>Loading...</Typography>}
            {suggestions.map(suggestion => {
              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item'
              // inline style for demonstration purpose
              const style = suggestion.active
                ? {
                    backgroundColor: '#fafafa',
                    cursor: 'pointer',
                    minHeight: '40px',
                  }
                : {
                    backgroundColor: '#ffffff',
                    cursor: 'pointer',
                    minHeight: '40px',
                  }
              return (
                <Grid
                  container
                  alignItems="center"
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <Typography>{suggestion.description}</Typography>
                </Grid>
              )
            })}
          </Grid>
        </Grid>
      )}
    </PlacesAutocomplete>
  )
}

export default LocationInput
