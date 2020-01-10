import React, { useState, useEffect } from 'react'
import {
  Grid,
  Typography,
  Button,
  Paper,
  withWidth,
  makeStyles
} from '@material-ui/core/'

const useStyles = makeStyles(theme => ({
  column: {
    height: '91vh'
  }
}))

function Shell(props) {
  const classes = useStyles()
  const [leftHidden, setLeftHidden] = useState(false)
  const [middleHidden, setMiddleHidden] = useState(false)
  const [rightHidden, setRightHidden] = useState(true)

  useEffect(() => {
    if (props.width === 'xs') {
      show(1)
    } else {
      close()
    }
  }, [props.width]);

  const show = (column) => {
    if (props.width === 'xs') {
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
    <Grid container spacing={0}>
      <Grid item xs={12} sm={4} hidden={leftHidden}>
        <Paper className={classes.column}>
          <Typography variant='h3'>Column 1</Typography>
          {props.width === 'xs' && 
            <Button onClick={() => show(2)}>Go to Column 2</Button>
          }
        </Paper>
      </Grid>
      <Grid item xs={12} sm={rightHidden ? 8 : 4} hidden={middleHidden}>
        <Paper className={classes.column}>
          <Typography variant='h3'>Column 2</Typography>
          {props.width === 'xs' ? (
            <>
              <Button onClick={() => show(1)}>Go to Column 1</Button>
              <Button onClick={() => show(3)}>Go to Column 3</Button>
            </>
          ) : <Button onClick={() => show(3)} disabled={!rightHidden}>Show Column 3</Button> }
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4} hidden={rightHidden}>
        <Paper className={classes.column}>
          <Typography variant='h3'>Column 3</Typography>
          {props.width === 'xs' ? 
            <Button onClick={() => show(2)}>Go to Column 2</Button> :
            <Button onClick={close}>Close Column 3</Button>
          }
        </Paper>
      </Grid>
    </Grid>
  )
}

export default withWidth()(Shell)