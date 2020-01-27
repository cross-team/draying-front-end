import React from 'react'
import {
  makeStyles,
  Typography,
  IconButton,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core/'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/pro-light-svg-icons/'

const useStyles = makeStyles(theme => ({
  summary: {
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  summaryPanel: {
    backgroundColor: theme.palette.primary.main,
  },
  summaryText: {
    color: theme.palette.primary.contrastText
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  }
}))

const OrderPanel = ({ order }) => {
  const classes = useStyles()

  return (
    <ExpansionPanel defaultExpanded={true}>
      <ExpansionPanelSummary className={classes.summaryPanel}> 
        <div className={classes.summary}>
          <Typography className={classes.summaryText}>Order</Typography>
          <IconButton
            onClick={event => event.stopPropagation()}
            onFocus={event => event.stopPropagation()}
          >
            <FontAwesomeIcon className={classes.summaryText} icon={faEllipsisV} />
          </IconButton>
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div className={classes.details}>
          <div>
            <Typography>#Order Num</Typography>
            <Typography>#Booking Num</Typography>
          </div>
          <div>
            <Typography>Delivery Order Status</Typography>
            <Typography>Client Name</Typography>
          </div>
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default OrderPanel