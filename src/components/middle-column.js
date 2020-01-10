import React from 'react'
import { Paper, makeStyles, Card } from '@material-ui/core/'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  }
}))

const MiddleColumn = ({ children }) => {
  const classes = useStyles()
  return (
    <Paper className={classes.root}>
      {children}
      <Card>
        Hello World
      </Card>
    </Paper>
  )
}
export default MiddleColumn
