import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
  headerText: {
    color: theme.palette.primary.contrastText,
  },
  details: {
    padding: theme.spacing(1),
  },
}))

const OrderPanel = ({ draying }) => {
  const classes = useStyles()

  let doStatus = ''
  if (draying.containerStage.id === '2' || draying.containerStage.id === '3') {
    doStatus = 'On the Sea'
  } else if (
    draying.containerStage.id === '4' ||
    draying.containerStage.id === '5'
  ) {
    doStatus = 'To Dispatch'
  } else if (draying.containerStage.id === '6') {
    doStatus = 'Dispatched'
  } else if (draying.containerStage.id === '9') {
    doStatus = 'Completed'
  } else if (draying.containerStage.id === '10') {
    doStatus = 'Reviewed'
  } else if (draying.containerStage.id === '11') {
    doStatus = 'Invoiced'
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Typography className={classes.headerText}>Order</Typography>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid container className={classes.details} justify="space-between">
        <Grid item>
          <Typography>
            {draying.order
              ? `#${draying.order.id}`
              : 'No order number was found for this trip.'}
          </Typography>
          <Typography>{`#${draying.booking}`}</Typography>
        </Grid>
        <Grid item>
          <Typography>{doStatus}</Typography>
          <Typography>{draying.client.companyName}</Typography>
        </Grid>
      </Grid>
    </>
  )
}

export default OrderPanel
