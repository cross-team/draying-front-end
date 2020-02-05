import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

export const GET_STOP_QUOTE = gql`
  query quoteExtraStopPrices($drayingId: Int, $deliveryLocationId: Int) {
    quoteExtraStopPrices(
      drayingId: $drayingId
      deliveryLocationId: $deliveryLocationId
    ) {
      __typename
      tripActionId
      tripActionOrder
      name
      price
      suggestedPrice
    }
  }
`

const useStyles = makeStyles(theme => ({
  input: {
    marginTop: theme.spacing(2),
    width: '100%',
  },
}))

const PriceFields = ({
  drayingId,
  locationId,
  tripActions,
  setTripActions,
  handlePriceChange,
}) => {
  const classes = useStyles()
  const { loading, error, data } = useQuery(GET_STOP_QUOTE, {
    variables: {
      drayingId: parseInt(drayingId),
      deliveryLocationId: locationId,
    },
  })

  if (loading) {
    return <Typography>Loading...</Typography>
  }

  if (error) {
    console.log(error)
    return <Typography>Error</Typography>
  }

  console.log(data)

  const fields = data.quoteExtraStopPrices.map(action => (
    <TextField
      className={classes.input}
      variant="outlined"
      label={action.name}
      value={
        tripActions.filter(obj => obj.tripActionId === action.tripActionId)
          .price
      }
      onChange={() => handlePriceChange(action.tripActionId)}
    />
  ))

  setTripActions(
    data.quoteExtraStopPrices.map(action => {
      return {
        drayingId: parseInt(drayingId),
        tripActionOrder: parseInt(action.tripActionOrder),
        tripActionId: parseInt(action.tripActionId),
        price: parseFloat(action.suggestedPrice),
        priceQuote: parseFloat(action.suggestedPrice),
      }
    }),
  )

  return fields
}

export default PriceFields
