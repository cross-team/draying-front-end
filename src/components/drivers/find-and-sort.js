import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'
import debounce from 'lodash/debounce'

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

const handleFilter = debounce((val, callback) => {
  callback(val)
}, 250)

const FindAndSort = ({ driver }) => {
  const client = useApolloClient()
  const [searchDriversInput, setSearchDriversInput] = useState('')
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

  const writeToCache = val => {
    client.writeData({
      data: {
        dispatchState: {
          searchDrivers: val,
          __typename: 'DispatchState',
        },
      },
    })
  }

  const handleFindChange = event => {
    const val = event.target.value
    setSearchDriversInput(val)
    handleFilter(val, writeToCache)
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
          value={searchDriversInput}
          margin="normal"
          variant="outlined"
          fullWidth
          onChange={handleFindChange}
        />
      </Grid>
    </Grid>
  )
}

export default FindAndSort
