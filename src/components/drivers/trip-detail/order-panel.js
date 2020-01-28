import React from 'react'
import {
  makeStyles,
  Typography,
  IconButton,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanelActions,
  Button
} from '@material-ui/core/'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/pro-light-svg-icons/'

const useStyles = makeStyles(theme => ({
  summary: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
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

const OrderPanel = ({ draying }) => {
  const classes = useStyles()

  let doStatus = ''
  if (draying.containerStage.id === '2' || draying.containerStage.id === '3') {
    doStatus = 'On the Sea'
  } else if (draying.containerStage.id === '4' || draying.containerStage.id === '5') {
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
    <ExpansionPanel defaultExpanded={true}>
      <ExpansionPanelSummary className={classes.summaryPanel}> 
        <div className={classes.summary}>
          <Typography className={classes.summaryText}>Order</Typography>
          <IconButton
            onClick={event => event.stopPropagation()}
            onFocus={event => event.stopPropagation()}
          >
            <FontAwesomeIcon className={classes.summaryText} icon={faPencil} />
          </IconButton>
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div className={classes.details}>
          <div>
            <Typography>{draying.order ? `#${draying.order.id}` : 'No order number was found for this trip.'}</Typography>
            <Typography>{`#${draying.booking}`}</Typography>
          </div>
          <div>
            <Typography>{doStatus}</Typography>
            <Typography>{draying.client.companyName}</Typography>
          </div>
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default OrderPanel