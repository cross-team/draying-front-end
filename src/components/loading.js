import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/styles/makeStyles'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  item: {
    padding: theme.spacing(3),
  },
}))

const Loading = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid container xs={12} justify="center">
        <Grid item className={classes.item}>
          <CircularProgress />
        </Grid>
      </Grid>
    </div>
  )
}

export default Loading
