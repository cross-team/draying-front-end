import React from 'react'
import { Paper, Grid, makeStyles } from '@material-ui/core/'

const useStyles = makeStyles(theme => ({
  item: {
    flex: 1,
    width: '100%',
    overflow: 'auto',
  },
  column: {
    minHeight: '100%',
    borderRight: '1px solid #d6d6d6',
    borderLeft: '1px solid #d6d6d6',
  },
}))

const MiddleColumn = ({ children }) => {
  const classes = useStyles()
  return (
    <Grid item className={classes.item}>
      <Paper className={classes.column}>{children}</Paper>
    </Grid>
  )
}
export default MiddleColumn
