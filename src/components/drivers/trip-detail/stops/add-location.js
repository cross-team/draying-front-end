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
import CircularProgress from '@material-ui/core/CircularProgress'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/pro-light-svg-icons/'

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

  const fieldReducer = (state, { type, field, value }) => {
    switch (type) {
      case 'update':
        return {
          ...state,
          [field]: value,
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
    contactName: '',
    contactType: '',
    phone: '',
    phoneType: '',
    email: '',
  })
  const update = (field, value) => dispatch({ type: 'update', field, value })

  const handleChange = field => event => {
    update(field, event.target.value)
  }

  const handleSave = () => {
    setSaving(true)
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
          onChange={handleChange('nickName')}
        />
        <TextField
          className={classes.input}
          variant="outlined"
          label="Receiving Hours Begin"
          value={fieldValues.hoursBegin}
          onChange={handleChange('hoursBegin')}
        />
        <TextField
          className={classes.input}
          variant="outlined"
          label="Receiving Hours End"
          value={fieldValues.hoursEnd}
          onChange={handleChange('hoursEnd')}
        />
        <TextField
          className={classes.input}
          variant="outlined"
          label="Delivery Location Address 1"
          value={fieldValues.DLA1}
          onChange={handleChange('DLA1')}
        />
        <TextField
          className={classes.input}
          variant="outlined"
          label="Delivery Location Address 2"
          value={fieldValues.DLA1}
          onChange={handleChange('DLA2')}
        />
        <TextField
          className={classes.input}
          variant="outlined"
          label="Contact Name"
          value={fieldValues.contactName}
          onChange={handleChange('contactName')}
        />
        <FormControl className={classes.input} variant="outlined">
          <InputLabel>Contact Type</InputLabel>
          <Select
            value={fieldValues.contactType}
            onChange={handleChange('contactType')}
          ></Select>
        </FormControl>
        <TextField
          className={classes.input}
          variant="outlined"
          label="Phone"
          value={fieldValues.phone}
          onChange={handleChange('phone')}
        />
        <FormControl className={classes.input} variant="outlined">
          <InputLabel>Phone Type</InputLabel>
          <Select
            value={fieldValues.phoneType}
            onChange={handleChange('phoneType')}
          ></Select>
        </FormControl>
        <TextField
          className={classes.input}
          variant="outlined"
          label="Email"
          value={fieldValues.email}
          onChange={handleChange('email')}
        />
      </Grid>
    </>
  )
}

export default AddLocation
