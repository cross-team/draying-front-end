import React, { useState } from 'react'
import { Menu, IconButton, makeStyles } from '@material-ui/core/'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/pro-light-svg-icons/'
import UndoTripActionPopUp from '../modals/undo-trip-action'
import ChangeTripActionPopUp from '../modals/change-trip-action'
import LostTripPopUp from '../modals/lost-trip'

const useStyles = makeStyles(theme => ({
  headerText: {
    color: theme.palette.primary.contrastText,
  },
}))

const EditTripMenu = ({ drayingId, tripId, trip }) => {
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
        {trip.status.id !== '6' && (
          <ChangeTripActionPopUp drayingId={drayingId} tripId={tripId} />
        )}
        {trip.status.id === '5' && (
          <LostTripPopUp tripId={tripId}></LostTripPopUp>
        )}
      </Menu>
    </>
  )
}

export default EditTripMenu
