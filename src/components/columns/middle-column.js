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
    height: '100%',
    borderRight: '1px solid #d6d6d6',
    borderLeft: '1px solid #d6d6d6',
  }
}))

export const GET_COLUMN_STATE = gql`
  query getColumnState {
    columnState @client {
      middleHidden,
      rightHidden
    }
  }
`

const MiddleColumn = ({ children }) => {
  const classes = useStyles()
  const { data: { columnState: { middleHidden, rightHidden } } } = useQuery(GET_COLUMN_STATE)
  return (
    <Grid item xs={12} sm={ rightHidden ? 8 : 4 } hidden={middleHidden} className={classes.item}>
      <Paper className={classes.column}>
        {children}
      </Paper>
    </Grid>
  )
}
export default MiddleColumn
