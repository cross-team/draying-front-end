import React from 'react'
import {
  makeStyles,
  Typography,
  IconButton,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Card
} from '@material-ui/core/'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faArrowRight } from '@fortawesome/pro-light-svg-icons/'

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
    width: '100%'
  },
  card: {
    padding: theme.spacing(1)
  },
  cardRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  stopContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  stop: {
    display: 'flex',
    alignItems: 'center',
  },
  margin: {
    margin: theme.spacing(1),
  }
}))

const ContainerPanel = ({ draying }) => {
  const classes = useStyles()

  return (
    <ExpansionPanel defaultExpanded={true}>
      <ExpansionPanelSummary className={classes.summaryPanel}> 
        <div className={classes.summary}>
          <Typography className={classes.summaryText}>Container</Typography>
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
          <Typography>Current Trip Action ></Typography>
          <Card className={classes.card}>
            <div className={classes.cardRow}>
              <div>
                <Typography>{draying.container}</Typography>
                <Typography variant='caption'>{`${draying.containerSize.name}, ${draying.containerType.name}`}</Typography>
              </div>
              <div>
                <Typography>{draying.priority}</Typography>
                <Typography>{draying.deliveryLocation.locationType.name}</Typography>
              </div>
            </div>
            <div className={classes.cardRow}>
              <Typography>{draying.loadType.name}</Typography>
              <Typography>{draying.cutOffDate}</Typography>
              <Typography>{draying.portStatus.name}</Typography>
            </div>
          </Card>
          <div className={classes.stopContainer}>
            <Typography>{draying.terminalLocation && draying.terminalLocation.nickName}</Typography>
            <div>
              <div className={classes.stop}>
                <FontAwesomeIcon icon={faArrowRight} className={classes.margin} />
                <Typography>1st Stop</Typography>
              </div>
              <div className={classes.stop}>
                <FontAwesomeIcon icon={faArrowRight} className={classes.margin} />
                <Typography>2nd Stop</Typography>
              </div>
              <div className={classes.stop}>
                <FontAwesomeIcon icon={faArrowRight} className={classes.margin} />
                <Typography>{draying.returnTerminal && draying.returnTerminal.nickName}</Typography>
              </div>
            </div>
          </div>
          <Typography>Appointments</Typography>
          <Typography>Container Location History</Typography>
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default ContainerPanel