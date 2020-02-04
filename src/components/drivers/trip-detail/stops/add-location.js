import React, { useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
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

const AddLocation = ({ setAddL }) => {
  const classes = useStyles()
  const [saving, setSaving] = useState(false)
  const [data, setData] = useState({})

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
      </Grid>
    </>
  )
}

export default AddLocation
