import React, { useState } from 'react'
import {
  makeStyles,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  IconButton,
  TextField,
} from '@material-ui/core/'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/pro-light-svg-icons/'

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
  const [findMode, setFindMode] = useState(false)
  const [find, setFind] = useState('')

  const handleOrderChange = event => {
    setOrder(event.target.value)
  }

  const handleFindChange = event => {
    setFind(event.target.value)
  }

  const handleClick = () => {
    setFindMode(!findMode)
  }

  return (
    <div className={classes.root}>
      {findMode ? (
        <TextField
          className={classes.formControl}
          label="Find Driver"
          value={find}
          onChange={handleFindChange}
        />
      ) : (
        <FormControl className={classes.formControl}>
          <InputLabel>Drivers</InputLabel>
          <Select value={order} onChange={handleOrderChange}>
            <MenuItem value="capacity">Today's Capacity</MenuItem>
            <MenuItem value="a-z">Driver A-Z</MenuItem>
            <MenuItem value="z-a">Driver Z-A</MenuItem>
            <MenuItem value="time2finish">Time to Finish</MenuItem>
            <MenuItem value="#legs">Number of Legs</MenuItem>
          </Select>
        </FormControl>
      )}
      <IconButton onClick={handleClick}>
        <FontAwesomeIcon icon={faSearch} />
      </IconButton>
    </div>
  )
}

export default FindAndSort
