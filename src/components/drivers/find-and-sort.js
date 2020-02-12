import React from 'react'
import TextField from '@material-ui/core/TextField'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'

export const GET_DISPATCH_STATE = gql`
  query getFindAndSortDispatchState {
    dispatchState @client {
      selectedDate {
        day
        month
        year
      }
      sortDriversBy
      searchDrivers
    }
  }
`

const FindAndSort = ({ driver }) => {
  const client = useApolloClient()

  const { data } = useQuery(GET_DISPATCH_STATE)

  const handleOrderChange = event => {
    client.writeData({
      data: {
        dispatchState: {
          sortDriversBy: event.target.value,
          __typename: 'DispatchState',
        },
      },
    })
  }

  const handleFindChange = event => {
    client.writeData({
      data: {
        dispatchState: {
          searchDrivers: event.target.value,
          __typename: 'DispatchState',
        },
      },
    })
  }
  const orderByValues = [
    { name: 'Name', value: 'NAME' },
    { name: 'Capacity', value: 'CAPACITY' },
  ]
  const menuItems = orderByValues.map(({ name, value }) => (
    <MenuItem key={name} value={value}>
      {name}
    </MenuItem>
  ))

  return (
    <Grid container alignItems="flex-end">
      <Grid item xs={6}>
        <TextField
          label="Sort By:"
          value={data.dispatchState.sortDriversBy}
          select
          onChange={handleOrderChange}
          margin="normal"
          variant="outlined"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        >
          {menuItems}
        </TextField>
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Search Drivers"
          value={data.dispatchState.searchDrivers}
          margin="normal"
          variant="outlined"
          onChange={handleFindChange}
        />
      </Grid>
    </Grid>
  )
}

export default FindAndSort
