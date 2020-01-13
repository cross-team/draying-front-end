import React, { useEffect } from 'react'
import {
  Grid,
  Typography,
  Button,
  Paper,
  withWidth,
  makeStyles
} from '@material-ui/core/'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import useColumnSetters from '../utils/column-setters'

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

const GET_COLUMN_STATE = gql`
  {
    columnState @client {
      leftHidden
      middleHidden
      rightHidden
    }
  }
`

function Shell({ width }) {
  const classes = useStyles()
  const { data: { columnState } } = useQuery(GET_COLUMN_STATE)
  const { leftHidden, middleHidden, rightHidden } = columnState
  const [ setLeftHidden, setMiddleHidden, setRightHidden ] = useColumnSetters()

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
        setRightHidden(false)
      }
    } else {
      setLeftHidden(false)
      setMiddleHidden(false)
      setRightHidden(false)
    }
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