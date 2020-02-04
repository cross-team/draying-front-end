import React /* useState */ from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Grid from '@material-ui/core/Grid'
import CloseIcon from '@material-ui/icons/Close'
import EditIcon from '@material-ui/icons/Edit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/pro-light-svg-icons/'

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
}))

const AllStops = ({ draying, setEdit, setAddS, setIsTerminal }) => {
  const classes = useStyles()

  const extraStops = draying.extraStops.map((stop, index) => (
    <TextField
      className={classes.input}
      variant="outlined"
      label={`Stop ${index + 2} `}
      value={stop.deliveryLocation.nickName}
      InputProps={{
        readOnly: true,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => setEdit(stop.deliveryLocation)}>
              <EditIcon />
            </IconButton>
            <IconButton>
              <CloseIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    ></TextField>
  ))

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Typography className={classes.headerText}>Stops</Typography>
            <div>
              <IconButton onClick={() => setAddS(true)}>
                <FontAwesomeIcon className={classes.headerText} icon={faPlus} />
              </IconButton>
            </div>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid className={classes.details}>
        <TextField
          className={classes.input}
          variant="outlined"
          label="Delivery Location "
          value={draying.deliveryLocation.nickName}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setEdit(draying.deliveryLocation)}>
                  <EditIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {extraStops}
        <TextField
          className={classes.input}
          variant="outlined"
          label="Return Terminal "
          value={draying.returnTerminal && draying.returnTerminal.nickName}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    setIsTerminal(true)
                    setEdit(true)
                  }}
                >
                  <EditIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      {/* data && !data.updateDraying.success && (
        <Alert severity="error">{data.updateDraying.message}</Alert>
      ) */}
    </>
  )
}

export default AllStops
