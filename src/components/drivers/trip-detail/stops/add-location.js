import React, { useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import CircularProgress from '@material-ui/core/CircularProgress'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/pro-light-svg-icons/'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import LocationInput from '../../../location-input '

export const GET_TYPES = gql`
  query getTypes {
    contactTypes {
      id
      name
    }
    phoneTypes {
      id
      name
    }
  }
`

export const ADD_LOCATION = gql`
  mutation addDeliveryLocation($deliveryLocation: DeliveryLocationInput) {
    addDeliveryLocation(deliveryLocation: $deliveryLocation) {
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
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  toolbar: {
    width: '100%',
    padding: '0px',
  },
  button: {
    marginRight: theme.spacing(2),
  },
  input: {
    marginTop: theme.spacing(2),
    width: '100%',
  },
}))

const AddLocation = ({ setAddL }) => {
  const classes = useStyles()
  const { loading, error, data } = useQuery(GET_TYPES)

  const [
    addDeliveryLocation,
    { loading: mutationLoading, error: mutationError, data: mutationData },
  ] = useMutation(ADD_LOCATION, {
    refetchQueries: ['deliveryLocations'],
    onCompleted: () => {
      setAddL(false)
    },
    awaitRefetchQueries: true,
  })

  const fieldReducer = (state, { type, field, value, id, subId }) => {
    let contacts
    let location
    let subObjects
    switch (type) {
      case 'updateField':
        return {
          ...state,
          [field]: value,
        }
      case 'updateContactFieldById':
        contacts = state.contacts.map(contact => {
          if (contact.id === id) {
            return {
              ...contact,
              [field]: value,
            }
          }
          return contact
        })
        return {
          ...state,
          contacts,
        }
      case 'updatePhoneFieldById':
        contacts = state.contacts.map(contact => {
          if (contact.id === id) {
            subObjects = contact.phones.map(phone => {
              if (phone.id === subId) {
                return {
                  ...phone,
                  [field]: value,
                }
              }
              return phone
            })
            return {
              ...contact,
              phones: subObjects,
            }
          }
          return contact
        })
        return {
          ...state,
          contacts,
        }
      case 'updateEmailById':
        contacts = state.contacts.map(contact => {
          if (contact.id === id) {
            subObjects = contact.emails.map(email => {
              if (email.id === subId) {
                return {
                  ...email,
                  email: value,
                }
              }
              return email
            })
            return {
              ...contact,
              emails: subObjects,
            }
          }
          return contact
        })
        return {
          ...state,
          contacts,
        }
      case 'addContact':
        contacts = [...state.contacts]
        contacts.push({
          id: contacts.length,
          name: '',
          contactTypeId: '',
          active: true,
          phones: [{ id: 0, phone: '', phoneTypeId: '', active: true }],
          emails: [{ id: 0, email: '', active: true }],
        })
        return {
          ...state,
          contacts,
        }
      case 'addPhone':
        contacts = [...state.contacts]
        contacts[id].phones.push({
          id: contacts[id].phones.length,
          phone: '',
          phoneTypeId: '',
          active: true,
        })
        return {
          ...state,
          contacts,
        }
      case 'addEmail':
        contacts = [...state.contacts]
        contacts[id].emails.push({
          id: contacts[id].emails.length,
          email: '',
          active: true,
        })
        return {
          ...state,
          contacts,
        }
      case 'appendCoordinates':
        location = { ...state.location }
        location.coordinates = value
        return {
          ...state,
          location,
        }
      default:
        throw new Error(`Unhandled action: ${type}`)
    }
  }
  const [fieldValues, dispatch] = React.useReducer(fieldReducer, {
    nickName: '',
    hoursBegin: '',
    hoursEnd: '',
    location: '',
    suite: '',
    contacts: [
      {
        id: 0,
        name: '',
        contactTypeId: '',
        active: true,
        phones: [{ id: 0, phone: '', phoneTypeId: '', active: true }],
        emails: [{ id: 0, email: '', active: true }],
      },
    ],
  })

  const updateContactFieldById = (field, id) => event => {
    const value = event.target.value
    dispatch({ type: 'updateContactFieldById', field, value, id })
  }

  const updatePhoneFieldById = (field, id, subId) => event => {
    const value = event.target.value
    dispatch({ type: 'updatePhoneFieldById', field, value, id, subId })
  }

  const updateEmailById = (id, subId) => event => {
    const value = event.target.value
    dispatch({ type: 'updateEmailById', field: '', value, id, subId })
  }

  const updateField = field => event => {
    const value = event.target.value
    dispatch({ type: 'updateField', field, value })
  }

  const addContact = () => {
    dispatch({ type: 'addContact' })
  }

  const addPhone = id => {
    dispatch({ type: 'addPhone', id: id })
  }

  const addEmail = id => {
    dispatch({ type: 'addEmail', id: id })
  }

  const appendCoordinates = value => {
    dispatch({ type: 'appendCoordinates', value: value })
  }

  const handleSave = () => {
    if (fieldValues.location) {
      const location = {
        nickName: fieldValues.location.formatted_address,
        googleAddress: fieldValues.location.formatted_address,
        locStreet: '',
        locSuite: fieldValues.suite,
        locCity: '',
        locZip: '',
        locState: '',
        locCountry: '',
        partial: false,
        preferred: true,
        latitude: fieldValues.location.coordinates.lat,
        longitude: fieldValues.location.coordinates.lng,
      }
      fieldValues.location.address_components.forEach(component => {
        if (component.types[0] === 'street_number') {
          location.locStreet += component.short_name
        }
        if (component.types[0] === 'route') {
          location.locStreet += ' ' + component.short_name
        }
        if (
          component.types[0] === 'locality' ||
          component.types[0] === 'neighborhood'
        ) {
          location.locCity = component.short_name
        }
        if (component.types[0] === 'administrative_area_level_1') {
          location.locState = component.short_name
        }
        if (component.types[0] === 'postal_code') {
          location.locZip = component.short_name
        }
        if (component.types[0] === 'country') {
          location.locCountry = component.short_name
        }
      })
      const localStateContacts = JSON.parse(
        JSON.stringify(fieldValues.contacts),
      )
      const newContacts = localStateContacts.map(contact => {
        delete contact.id
        const newPhones = contact.phones.map(phone => {
          delete phone.id
          return phone
        })
        const newEmails = contact.emails.map(email => {
          delete email.id
          return email
        })
        return {
          ...contact,
          description: '',
          phones: newPhones,
          emails: newEmails,
        }
      })
      addDeliveryLocation({
        variables: {
          deliveryLocation: {
            nickName: fieldValues.nickName,
            isDefault: true,
            locationTypeId: 1,
            receivingHoursOpen: fieldValues.hoursBegin,
            receivingHoursClose: fieldValues.hoursEnd,
            location,
            contacts: newContacts,
          },
        },
      })
    }
  }

  const phoneTypes = () => {
    if (error) {
      console.log(error)
      return <Typography>Error</Typography>
    }
    if (loading) {
      return <Typography>Loading</Typography>
    }
    const types = data.phoneTypes.map(type => (
      <MenuItem value={+type.id}>{type.name}</MenuItem>
    ))
    return types
  }

  const getPhones = id => {
    const phones = fieldValues.contacts[id].phones.map(phone => (
      <>
        <TextField
          className={classes.input}
          variant="outlined"
          label="Phone"
          value={phone.phone}
          onChange={updatePhoneFieldById('phone', id, phone.id)}
        />
        <FormControl className={classes.input} variant="outlined">
          <InputLabel>Phone Type</InputLabel>
          <Select
            value={phone.phoneTypeId}
            onChange={updatePhoneFieldById('phoneTypeId', id, phone.id)}
          >
            {phoneTypes()}
          </Select>
        </FormControl>
      </>
    ))
    return phones
  }

  const getEmails = id => {
    const emails = fieldValues.contacts[id].emails.map(email => (
      <TextField
        className={classes.input}
        variant="outlined"
        label="Email"
        value={email.email}
        onChange={updateEmailById(id, email.id)}
      />
    ))
    return emails
  }

  const contactTypes = () => {
    if (error) {
      console.log(error)
      return <Typography>Error</Typography>
    }
    if (loading) {
      return <Typography>Loading</Typography>
    }
    const types = data.contactTypes.map(type => (
      <MenuItem value={+type.id}>{type.name}</MenuItem>
    ))
    return types
  }

  const contacts = fieldValues.contacts.map(contact => (
    <>
      <TextField
        className={classes.input}
        variant="outlined"
        label="Contact Name"
        value={contact.name}
        onChange={updateContactFieldById('name', contact.id)}
      />
      <FormControl className={classes.input} variant="outlined">
        <InputLabel>Contact Type</InputLabel>
        <Select
          value={contact.contactTypeId}
          onChange={updateContactFieldById('contactTypeId', contact.id)}
        >
          {contactTypes()}
        </Select>
      </FormControl>
      {getPhones(contact.id)}
      {getEmails(contact.id)}
      <Grid>
        <Button onClick={() => addPhone(contact.id)}>Add Phone</Button>
        <Button onClick={() => addEmail(contact.id)}>Add Email</Button>
      </Grid>
    </>
  ))

  const hours = () => {
    const times = [
      { label: '12:00 AM', value: '00:00' },
      { label: '12:30 AM', value: '00:30' },
      { label: '01:00 AM', value: '01:00' },
      { label: '01:30 AM', value: '01:30' },
      { label: '02:00 AM', value: '02:00' },
      { label: '02:30 AM', value: '02:30' },
      { label: '03:00 AM', value: '03:00' },
      { label: '03:30 AM', value: '03:30' },
      { label: '04:00 AM', value: '04:00' },
      { label: '04:30 AM', value: '04:30' },
      { label: '05:00 AM', value: '05:00' },
      { label: '05:30 AM', value: '05:30' },
      { label: '06:00 AM', value: '06:00' },
      { label: '06:30 AM', value: '06:30' },
      { label: '07:00 AM', value: '07:00' },
      { label: '07:30 AM', value: '07:30' },
      { label: '08:00 AM', value: '08:00' },
      { label: '08:30 AM', value: '08:30' },
      { label: '09:00 AM', value: '09:00' },
      { label: '09:30 AM', value: '09:30' },
      { label: '10:00 AM', value: '10:00' },
      { label: '10:30 AM', value: '10:30' },
      { label: '11:00 AM', value: '11:00' },
      { label: '11:30 AM', value: '11:30' },
      { label: '12:00 PM', value: '12:00' },
      { label: '12:30 PM', value: '12:30' },
      { label: '01:00 PM', value: '13:00' },
      { label: '01:30 PM', value: '13:30' },
      { label: '02:00 PM', value: '14:00' },
      { label: '02:30 PM', value: '14:30' },
      { label: '03:00 PM', value: '15:00' },
      { label: '03:30 PM', value: '15:30' },
      { label: '04:00 PM', value: '16:00' },
      { label: '04:30 PM', value: '16:30' },
      { label: '05:00 PM', value: '17:00' },
      { label: '05:30 PM', value: '17:30' },
      { label: '06:00 PM', value: '18:00' },
      { label: '06:30 PM', value: '18:30' },
      { label: '07:00 PM', value: '19:00' },
      { label: '07:30 PM', value: '19:30' },
      { label: '08:00 PM', value: '20:00' },
      { label: '08:30 PM', value: '20:30' },
      { label: '09:00 PM', value: '21:00' },
      { label: '09:30 PM', value: '21:30' },
      { label: '10:00 PM', value: '22:00' },
      { label: '10:30 PM', value: '22:30' },
      { label: '11:00 PM', value: '23:00' },
      { label: '11:30 PM', value: '23:30' },
    ]

    return times.map(time => (
      <MenuItem value={time.value}>{time.label}</MenuItem>
    ))
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
                  setAddL(false)
                }}
              >
                <FontAwesomeIcon
                  className={classes.headerText}
                  icon={faChevronLeft}
                />
              </IconButton>
              <Typography className={classes.headerText}>
                Add Location
              </Typography>
            </Grid>
            {mutationLoading ? (
              <CircularProgress color="secondary" />
            ) : error ? (
              <Typography>{error}</Typography>
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
        <Typography>Add a Location</Typography>
        <TextField
          className={classes.input}
          variant="outlined"
          label="NickName"
          value={fieldValues.nickName}
          onChange={updateField('nickName')}
        />
        <FormControl className={classes.input} variant="outlined">
          <InputLabel>Receiving Hours Begin</InputLabel>
          <Select
            value={fieldValues.hoursBegin}
            onChange={updateField('hoursBegin')}
          >
            {hours()}
          </Select>
        </FormControl>
        <FormControl className={classes.input} variant="outlined">
          <InputLabel>Receiving Hours End</InputLabel>
          <Select
            value={fieldValues.hoursEnd}
            onChange={updateField('hoursEnd')}
          >
            {hours()}
          </Select>
        </FormControl>
        <LocationInput
          appendCoordinates={appendCoordinates}
          updateLocation={value => {
            dispatch({ type: 'updateField', field: 'location', value })
          }}
        />
        <TextField
          className={classes.input}
          variant="outlined"
          label="Location Suite"
          value={fieldValues.suite}
          onChange={updateField('suite')}
        />
        {contacts}
        <Button onClick={addContact}>Add Contact</Button>
      </Grid>
    </>
  )
}

export default AddLocation
