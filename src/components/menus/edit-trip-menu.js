import React, { useState } from 'react'
import { Menu, MenuItem, IconButton, makeStyles } from '@material-ui/core/'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/pro-light-svg-icons/'
import UndoTripActionPopUp from '../modals/undo-trip-action'
import ChangeTripActionPopUp from '../modals/change-trip-action'

const useStyles = makeStyles(theme => ({
  headerText: {
    color: theme.palette.primary.contrastText,
  },
}))

const EditTripMenu = ({ drayingId, tripId }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = event => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleClose = event => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton onClick={handleClick}>
        <FontAwesomeIcon className={classes.headerText} icon={faEllipsisV} />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <UndoTripActionPopUp drayingId={drayingId} />

        <ChangeTripActionPopUp drayingId={drayingId} tripId={tripId} />

        <MenuItem onClick={handleClose}>Change Trip Action</MenuItem>
        <MenuItem onClick={handleClose}>Undo Trip Action</MenuItem>
        <MenuItem onClick={handleClose}>Add Leg</MenuItem>
        <MenuItem onClick={handleClose}>Lost Trip</MenuItem>
      </Menu>
    </>
  )
}

export default EditTripMenu
