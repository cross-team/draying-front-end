import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Fab from '@material-ui/core/Fab'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/pro-light-svg-icons'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

export const SET_COLUMN_STATE = gql`
  mutation openAddTripPanel(
    $hideLeft: Boolean
    $hideMiddle: Boolean
    $hideRight: Boolean
  ) {
    setColumnState(
      hideLeft: $hideLeft
      hideMiddle: $hideMiddle
      hideRight: $hideRight
    ) @client {
      leftHidden
      middleHidden
      rightHidden
    }
  }
`
const AddTripButton = () => {
  const [setColumnState] = useMutation(SET_COLUMN_STATE)
  const theme = useTheme()
  const isBigScreen = useMediaQuery(theme.breakpoints.up('sm'))
  const handleAddTrip = () => {
    if (!isBigScreen) {
      setColumnState({
        variables: {
          hideLeft: true,
          hideMiddle: true,
          hideRight: false,
        },
      })
    } else {
      setColumnState({
        variables: {
          hideLeft: false,
          hideMiddle: false,
          hideRight: false,
        },
      })
    }
  }

  return (
    <Grid item>
      <Grid container alignItems="center" spacing={1}>
        <Grid item>
          <Typography>ADD A TRIP</Typography>
        </Grid>

        <Grid item>
          <Fab aria-label="Add a trip" onClick={handleAddTrip}>
            <FontAwesomeIcon icon={faPlus} />
          </Fab>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default AddTripButton // withWidth()(
