import React from 'react'
import {
  makeStyles,
  Card,
  Avatar,
  Typography,
  Fab
} from '@material-ui/core/'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/pro-light-svg-icons/'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(1),
  },
  container: {
    display: 'flex',
    alignItems: 'center'
  },
  margin: {
    margin: theme.spacing(1),
  },
}))

const DriverHeader = ( { selectedDriver } ) => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <div className={classes.container}>
        <Avatar className={classes.margin}>{ selectedDriver }</Avatar>
        <div>
          <Typography>Firstname Lastname</Typography>
          <Typography variant='caption'>(123)-456-7890</Typography>
        </div>
      </div>
      <div className={classes.container}>
        <Typography>ADD A TRIP</Typography>
        <Fab className={classes.margin} ><FontAwesomeIcon icon={faPlus} /></Fab>
      </div>
    </Card>
  )
}

export default DriverHeader