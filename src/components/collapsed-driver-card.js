import React from 'react'
import {
  makeStyles,
  Card,
  Avatar,
  Typography,
  Chip
} from '@material-ui/core/'
import { ChevronRight } from '@material-ui/icons/'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  dataContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(1),
  },
  chipContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  margin: {
    margin: theme.spacing(1),
  }
}))

const CollapsedDriverCard = ({ driver }) => {
  const classes = useStyles()

  fullName = `${driver.FirstName} ${driver.LastName}`

  return (
    <Card className={classes.root}>
      <Avatar className={classes.margin} src={driver.Avatar}/>
      <div className={classes.dataContainer}>
        <Typography>{fullName}</Typography>
        <div className={classes.chipContainer}>
          <Chip label='Capacity'/>
          <div>
            <Chip label='Current'/>
            <Chip label='Legs'/>
          </div>
        </div>
      </div>
      <ChevronRight className={classes.margin} />
    </Card>
  )
}

export default CollapsedDriverCard
