import React, { useEffect } from 'react'
import { Grid, withWidth, makeStyles } from '@material-ui/core/'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import LeftColumn from './left-column'
import MiddleColumn from './middle-column'
import RightColumn from './right-column'

const useStyles = makeStyles(theme => ({
  container: {
    overflow: 'hidden',
    flex: 1,
  },
}))

export const SET_COLUMN_STATE = gql`
  mutation setColumnState(
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

export const GET_COLUMN_STATE = gql`
  query getColumnState {
    columnState @client {
      leftHidden
      middleHidden
      rightHidden
    }
  }
`

function Shell({ width, left, middle, right }) {
  const classes = useStyles()
  const [setColumnState] = useMutation(SET_COLUMN_STATE)

  useEffect(() => {
    if (width === 'xs' || width === 'sm') {
      setColumnState({
        variables: {
          hideLeft: false,
          hideMiddle: true,
          hideRight: true,
        },
      })
    } else {
      setColumnState({
        variables: {
          hideLeft: false,
          hideMiddle: false,
        },
      })
    }
  }, [setColumnState, width])

  return (
    <Grid container spacing={0} className={classes.container}>
      <LeftColumn>{left}</LeftColumn>
      <MiddleColumn>{middle}</MiddleColumn>
      <RightColumn>{right}</RightColumn>
    </Grid>
  )
}

export default withWidth()(Shell)
