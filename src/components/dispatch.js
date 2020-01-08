import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import DrayingCard from './draying-card'
import LeftColumn from './left-column'
import { Grid, makeStyles } from '@material-ui/core/'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  }
}))

export const GET_ALL_DRAYINGS = gql`
  query GetAllDrayings {
    drayings {
      cursor
      hasMore
      drayings {
        id
        order {
          id
        }
      }
    }
  }
`
export default function Dispatch() {
  const classes = useStyles()
  const { data, loading, error } = useQuery(GET_ALL_DRAYINGS)
  if (loading) return <>Loading...</>
  if (error) return <p>ERROR: {error.message}</p>
  const drayings = data.drayings ? data.drayings.drayings || [] : []
  return (
    <div className={classes.root}>
      <LeftColumn />
      <Grid container spacing={1}>
        {drayings && drayings.length > 0
          ? drayings.map(draying => (
              <Grid item xs={6} sm={4} md={3}>
                <DrayingCard draying={draying} />
              </Grid>
            ))
          : ''}
      </Grid>
    </div>
  )
}
