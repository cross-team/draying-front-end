import React, { useEffect } from 'react'
import {
  Grid,
  Typography,
  Button,
  Paper,
  withWidth,
  makeStyles
} from '@material-ui/core/'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import useColumnSetters from '../../utils/column-setters'

const useStyles = makeStyles(theme => ({
  container: {
    height: '91.7%',
  },
  item: {
    overflow: 'scroll',
  },
  column: {
    height: '100%',
    borderRight: '1px solid #d6d6d6',
    borderLeft: '1px solid #d6d6d6'
  }
}))

export const GET_COLUMN_STATE = gql`
  query getColumnState {
    columnState @client {
      leftHidden
      middleHidden
      rightHidden
    }

  }
`
export const SET_COLUMN_STATE = gql`
  mutation setColumnState($hideLeft: Boolean, $hideMiddle: Boolean, $hideRight: Boolean) {
    setColumnState(hideLeft: $hideLeft, hideMiddle: $hideMiddle, hideRight: $hideRight) @client {
      leftHidden
      middleHidden
      rightHidden
    }
  }
`;

function Shell({ width }) {
  const classes = useStyles()
  const { data: { columnState: { leftHidden, middleHidden, rightHidden } } } = useQuery(GET_COLUMN_STATE)
  const [setColumnState, { data: mutatedData } ] = useMutation(SET_COLUMN_STATE)
  debugger

  // const columnState = {
  //   leftHidden: false,
  //   middleHidden: false,
  //   rightHidden: true
  // }
  // const { leftHidden, middleHidden, rightHidden } = columnState
  // const [ setLeftHidden, setMiddleHidden, setRightHidden ] = useColumnSetters()
  const setLeftHidden = (hidden) => setColumnState({variables: {hideLeft: hidden} })
  const setMiddleHidden = (hidden )=> setColumnState({variables: {hideMiddle: hidden}})
  const setRightHidden = (hidden) => setColumnState({variables: {hideRight: hidden}})
  useEffect(() => {
    if (width === 'xs') {
      show(1)
    } else {
      close()
    }
  }, [width]);

  const show = (column) => {
    if (width === 'xs') {
      if (column === 1) {
        setLeftHidden(false)
        setMiddleHidden(true)
        setRightHidden(true)
      } else if (column === 2) {
        setLeftHidden(true)
        setMiddleHidden(false)
        setRightHidden(true)
      } else if (column === 3) {
        setLeftHidden(true)
        setMiddleHidden(true)
        debugger;
        setRightHidden(false)
      }
    } else {
      setLeftHidden(false)
      setMiddleHidden(false)
      setRightHidden(false)
    }
    debugger

  }

  const close = () => {
    setLeftHidden(false)
    setMiddleHidden(false)
    setRightHidden(true)
  }

  return (
    <Grid container spacing={0} className={classes.container}>
      <Grid item xs={12} sm={4} hidden={leftHidden} className={classes.item}>
        <Paper className={classes.column}>
          <Typography variant='h3'>Column 1</Typography>
          {width === 'xs' &&
            <Button onClick={() => show(2)}>Go to Column 2</Button>
          }
        </Paper>
      </Grid>
      <Grid item xs={12} sm={rightHidden ? 8 : 4} hidden={middleHidden} className={classes.item}>
        <Paper className={classes.column}>
          <Typography variant='h3'>Column 2</Typography>
          {width === 'xs' ? (
            <>
              <Button onClick={() => show(1)}>Go to Column 1</Button>
              <Button onClick={() => show(3)}>Go to Column 3</Button>
            </>
          ) : <Button onClick={() => show(3)} disabled={!rightHidden}>Show Column 3</Button> }
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4} hidden={rightHidden} className={classes.item}>
        <Paper className={classes.column}>
          <Typography variant='h3'>Column 3</Typography>
          {width === 'xs' ?
            <Button onClick={() => show(2)}>Go to Column 2</Button> :
            <Button onClick={close}>Close Column 3</Button>
          }
        </Paper>
      </Grid>
    </Grid>
  )
}

export default withWidth()(Shell)
