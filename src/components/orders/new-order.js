import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Backdrop from '@material-ui/core/Backdrop'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import Checkbox from '@material-ui/core/Checkbox'
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  heading: {
    margin: theme.spacing(2),
    marginLeft: theme.spacing(4),
    width: '100%',
  },
  root: {
    width: '96%',
    height: '90vh',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  columnContainer: {
    width: '100%',
  },
  input: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  containersInput: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  clientInput: {
    width: '100%',
  },
  fab: {
    margin: theme.spacing(2),
  },
}))

const fieldReducer = (state, { type, field, value }) => {
  switch (type) {
    case 'updateField':
      return {
        ...state,
        [field]: value,
      }
    default:
      throw new Error(`Unhandled action: ${type}`)
  }
}

const NewOrder = ({ open, setOpen }) => {
  const classes = useStyles()
  const [fieldValues, dispatch] = React.useReducer(fieldReducer, {
    client: '',
    reference: '',
    loadType: 'import',
    containersText: '',
    location: '',
    isLive: 'live',
    dateTime: new Date(),
    special: '',
  })

  const handleChange = field => event => {
    const value = event.target.value
    dispatch({ type: 'updateField', field, value })
  }

  const updateDateTime = value => {
    dispatch({ type: 'updateField', field: 'dateTime', value: value })
  }

  return (
    <Backdrop className={classes.backdrop} open={open}>
      <Paper className={classes.root}>
        <Typography variant="h4" className={classes.heading}>
          New Order
        </Typography>
        <Grid
          className={classes.columnContainer}
          container
          justify="center"
          spacing={4}
        >
          <Grid item xs={3} container direction="column" alignItems="center">
            <Grid
              className={classes.input}
              container
              alignItems="center"
              wrap="nowrap"
            >
              <FormControl className={classes.clientInput} variant="outlined">
                <InputLabel shrink>Client</InputLabel>
                <Select
                  value={fieldValues.client}
                  onChange={handleChange('client')}
                  displayEmpty
                >
                  <MenuItem value="">Select a Client</MenuItem>
                </Select>
              </FormControl>
              <Fab className={classes.fab} size="small" color="primary">
                +
              </Fab>
            </Grid>
            <TextField
              className={classes.input}
              label="Reference"
              placeholder="Input Reference Number"
              variant="outlined"
              value={fieldValues.reference}
              onChange={handleChange('reference')}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <FormControl className={classes.input}>
              <Typography>Load Type</Typography>
              <RadioGroup
                value={fieldValues.loadType}
                onChange={handleChange('loadType')}
              >
                <Grid container alignItems="center" justify="space-around">
                  <FormControlLabel
                    value="import"
                    control={<Radio />}
                    label="Import"
                  />
                  <FormControlLabel
                    value="export"
                    control={<Radio />}
                    label="Export"
                  />
                </Grid>
              </RadioGroup>
            </FormControl>
            <Grid container alignItems="flex-end" direction="column">
              <TextField
                className={classes.containersInput}
                label="Containers"
                multiline
                rows="4"
                variant="outlined"
                value={fieldValues.containersText}
                onChange={handleChange('containersText')}
              />
              <Button variant="contained">Load info</Button>
            </Grid>
          </Grid>
          <Grid
            item
            xs={6}
            container
            direction="column"
            alignItems="flex-start"
          >
            <Typography>Containers</Typography>
            <Grid container wrap="nowrap" alignItems="center">
              <Grid container alignItems="center">
                <Checkbox />
                <Typography>Planning Select All</Typography>
              </Grid>
              <Grid container alignItems="center">
                <Checkbox />
                <Typography>Manual Terminal Select All</Typography>
              </Grid>
            </Grid>
            <Button variant="contained">Add container</Button>
          </Grid>
          <Grid item xs={3} container direction="column" alignItems="center">
            <Grid
              className={classes.input}
              container
              alignItems="center"
              wrap="nowrap"
            >
              <FormControl className={classes.clientInput} variant="outlined">
                <InputLabel shrink>Delivert Location</InputLabel>
                <Select
                  value={fieldValues.location}
                  onChange={handleChange('location')}
                  displayEmpty
                >
                  <MenuItem value="">Select a Location</MenuItem>
                </Select>
              </FormControl>
              <Fab className={classes.fab} size="small" color="primary">
                +
              </Fab>
            </Grid>
            <FormControl className={classes.input}>
              <RadioGroup
                value={fieldValues.isLive}
                onChange={handleChange('isLive')}
              >
                <Grid container alignItems="center" justify="space-around">
                  <FormControlLabel
                    value="live"
                    control={<Radio />}
                    label="Live"
                  />
                  <FormControlLabel
                    value="drop"
                    control={<Radio />}
                    label="Drop"
                  />
                </Grid>
              </RadioGroup>
            </FormControl>
            <Grid
              className={classes.input}
              container
              wrap="nowrap"
              alignItems="center"
            >
              <Grid container alignItems="center">
                <Checkbox />
                <Typography>Is Urgent</Typography>
              </Grid>
              <Grid container alignItems="center">
                <Checkbox />
                <Typography>Not Released Pull</Typography>
              </Grid>
            </Grid>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDateTimePicker
                variant="inline"
                inputVariant="outlined"
                format="yyyy/MM/dd HH:mm"
                label="Date & Time"
                InputLabelProps={{ shrink: true }}
                className={classes.input}
                value={fieldValues.dateTime}
                onChange={updateDateTime}
              />
            </MuiPickersUtilsProvider>
            <Grid className={classes.input} container alignItems="center">
              <Button variant="contained">Add Extra Stop</Button>
            </Grid>
            <TextField
              className={classes.input}
              label="Special Instructions"
              multiline
              rows="2"
              variant="outlined"
              value={fieldValues.special}
              onChange={handleChange('special')}
            />
            <Grid className={classes.input} container alignItems="center">
              <Typography>Prices</Typography>
            </Grid>
            <Grid container alignItems="center">
              <Button variant="contained" color="primary">
                Plan
              </Button>
              <Button variant="contained">Clean</Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Backdrop>
  )
}

export default NewOrder
