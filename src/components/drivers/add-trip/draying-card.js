import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import gql from 'graphql-tag'
import format from 'date-fns/format'

export const UPDATE_DRAYING_FIELDS = gql`
  mutation drayingDetailUpdateDrayingFields(
    $drayingId: Int
    $drayingFields: [DrayingFieldsInput]
  ) {
    updateDrayingFields(drayingId: $drayingId, drayingFields: $drayingFields) {
      success
      errors {
        success
        message
        updatedId
      }
    }
  }
`

export const GET_DROPDOWN_OPTIONS = gql`
  query drayingDetailAllDropdowns {
    containerSizes {
      __typename
      id
      name
      size
    }
    containerTypes {
      __typename
      id
      name
      shortName
    }
    deliveryLocations {
      __typename
      id
      nickName
    }
  }
`

const useStyles = makeStyles(theme => ({
  details: {
    margin: theme.spacing(1),
  },
  card: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  margin: {
    margin: theme.spacing(1),
  },
  priorityContainer: {
    width: '100%',
    backgroundColor: theme.palette.danger.light,
    marginBottom: theme.spacing(1),
  },
  locationTypeContainer: {
    width: '100%',
    backgroundColor: '#f0f0f0',
  },
  tabText: {
    color: '#979797',
    marginRight: theme.spacing(1),
  },
}))

const DrayingCard = ({ draying }) => {
  const classes = useStyles()

  const cutOffDateObject = draying.cutOffDate
    ? new Date(draying.cutOffDate)
    : new Date()

  const content = (
    <>
      <Card className={classes.card}>
        <Grid container justify="space-between" alignItems="center">
          <div>
            <Typography>
              {draying.loadType.name === 'Export'
                ? `${draying.container} | ${draying.booking}`
                : draying.container}
            </Typography>
            <Typography variant="caption">{`${draying.containerSize.name}, ${draying.containerType.name}`}</Typography>
          </div>
          <Grid item xs={4}>
            <Grid
              container
              className={classes.priorityContainer}
              justify="flex-end"
            >
              <Typography className={classes.tabText}>
                {draying.priority}
              </Typography>
            </Grid>
            <Grid
              container
              className={classes.locationTypeContainer}
              justify="flex-end"
            >
              <Typography className={classes.tabText}>
                {draying.deliveryLocation.locationType.name}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justify="space-between" alignItems="center">
          <Typography>{draying.loadType.name}</Typography>
          <Typography>
            {cutOffDateObject && format(cutOffDateObject, 'MM/dd/yyyy')}
          </Typography>
          <Typography>{draying.portStatus.name}</Typography>
        </Grid>
      </Card>
    </>
  )

  return (
    <>
      <div className={classes.details}>{content}</div>
    </>
  )
}

export default DrayingCard
