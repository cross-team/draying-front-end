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
import DriverTripCard from '../driver-trip-card'

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
  }
}))

const TripPanel = ({ trip }) => {
  const classes = useStyles()

  return (
    <ExpansionPanel defaultExpanded={true}>
      <ExpansionPanelSummary className={classes.summaryPanel}> 
        <div className={classes.summary}>
          <Typography className={classes.summaryText}>Trip</Typography>
          <IconButton
            onClick={event => event.stopPropagation()}
            onFocus={event => event.stopPropagation()}
          >
            <FontAwesomeIcon className={classes.summaryText} icon={faEllipsisV} />
          </IconButton>
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div>
          <Typography>Available Trip Actions ></Typography>
          <DriverTripCard trip={trip} />
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default TripPanel