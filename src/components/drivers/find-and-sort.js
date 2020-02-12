import React, { useState } from 'react'
import makeStyles from '@material-ui/styles/makeStyles'
import TextField from '@material-ui/core/TextField'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faSearch } from '@fortawesome/pro-light-svg-icons/'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formControl: {
    width: '100%',
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
}))

const FindAndSort = ({ driver }) => {
  const classes = useStyles()
  const [order, setOrder] = useState('capacity')
  const [find, setFind] = useState('')

  const handleOrderChange = event => {
    setOrder(event.target.value)
  }

  const handleFindChange = event => {
    setFind(event.target.value)
  }

  return (
    <Grid container>
      <Grid item xs={6}>
        <TextField
          className={classes.formControl}
          label="Sort by:"
          select
          value={order}
          onChange={handleOrderChange}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          className={classes.formControl}
          label="Search Drivers"
          value={find}
          onChange={handleFindChange}
        />
      </Grid>
      {/* <IconButton onClick={handleClick}>
        <FontAwesomeIcon icon={faSearch} />
      </IconButton> */}
    </Grid>
  )
}

export default FindAndSort
