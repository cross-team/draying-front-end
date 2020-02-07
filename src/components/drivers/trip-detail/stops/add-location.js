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
  const [saving, setSaving] = useState(false)
  const { loading, error, data } = useQuery(GET_TYPES)

  const fieldReducer = (state, { type, field, value, id, subId }) => {
    let contacts
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
          contactName: '',
          contactType: '',
          phones: [{ id: 0, phone: '', phoneType: '' }],
          emails: [{ id: 0, email: '' }],
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
          phoneType: '',
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
        })
        return {
          ...state,
          contacts,
        }
      default:
        throw new Error(`Unhandled action: ${type}`)
    }
  }
  const [fieldValues, dispatch] = React.useReducer(fieldReducer, {
    nickName: '',
    hoursBegin: '',
    hoursEnd: '',
    DLA1: '',
    DLA2: '',
    contacts: [
      {
        id: 0,
        contactName: '',
        contactType: '',
        phones: [{ id: 0, phone: '', phoneType: '' }],
        emails: [{ id: 0, email: '' }],
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

  const handleSave = () => {
    setSaving(true)
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
            value={phone.phoneType}
            onChange={updatePhoneFieldById('phoneType', id, phone.id)}
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
        value={contact.contactName}
        onChange={updateContactFieldById('contactName', contact.id)}
      />
      <FormControl className={classes.input} variant="outlined">
        <InputLabel>Contact Type</InputLabel>
        <Select
          value={contact.contactType}
          onChange={updateContactFieldById('contactType', contact.id)}
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
        <Typography>Add a Location</Typography>
        <TextField
          className={classes.input}
          variant="outlined"
          label="NickName"
          value={fieldValues.nickName}
          onChange={updateField('nickName')}
        />
        <TextField
          className={classes.input}
          variant="outlined"
          label="Receiving Hours Begin"
          value={fieldValues.hoursBegin}
          onChange={updateField('hoursBegin')}
        />
        <TextField
          className={classes.input}
          variant="outlined"
          label="Receiving Hours End"
          value={fieldValues.hoursEnd}
          onChange={updateField('hoursEnd')}
        />
        <LocationInput />
        {contacts}
        <Button onClick={addContact}>Add Contact</Button>
      </Grid>
    </>
  )
}

export default AddLocation
