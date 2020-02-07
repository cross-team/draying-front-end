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

const LocationInput = () => {
  const classes = useStyles()
  const [address, setAddress] = useState('')
  const [location, setLocation] = useState('')

  const handleChange = event => {
    setAddress(event.target.value)
  }

  const handleSelect = () => {
    geocodeByAddress(location)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  }

  const handleClick = suggestion => {
    setAddress(suggestion.description)
    console.log('Suggestion', suggestion)
    console.log('Location', location)
  }

  return (
    <PlacesAutocomplete
      value={location}
      onChange={setLocation}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <Grid container>
          <TextField
            className={classes.input}
            variant="outlined"
            label="Location Address"
            value={address}
            onChange={handleChange}
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
                    height: '40px',
                  }
                : {
                    backgroundColor: '#ffffff',
                    cursor: 'pointer',
                    height: '40px',
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
                  <Typography onClick={() => handleClick(suggestion)}>
                    {suggestion.description}
                  </Typography>
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
