import React from 'react'
import { Paper, Grid, makeStyles } from '@material-ui/core/'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const useStyles = makeStyles(theme => ({
  item: {
    height: '100%',
    overflow: 'auto',
  },
  column: {
    minHeight: '100%',
    borderRight: '1px solid #d6d6d6',
    borderLeft: '1px solid #d6d6d6',
  },
}))

export const GET_COLUMN_STATE = gql`
  query getLeftColumnState {
    columnState @client {
      leftHidden
    }
  }
`

const LeftColumn = ({ children }) => {
  const classes = useStyles()
  const {
    data: {
      columnState: { leftHidden },
    },
  } = useQuery(GET_COLUMN_STATE)
  return (
    <Grid
      item
      xs={12}
      md={4}
      lg={3}
      xl={2}
      hidden={leftHidden}
      className={classes.item}
    >
      <Paper className={classes.column}>{children}</Paper>
    </Grid>
  )
}
export default LeftColumn
