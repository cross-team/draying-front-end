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
      <Grid container justify="center">
        <Grid item xs={12} className={classes.item}>
          <CircularProgress />
        </Grid>
      </Grid>
    </div>
  )
}

export default Loading
