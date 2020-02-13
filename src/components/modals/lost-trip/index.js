import React from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import PopUp from '../../common/pop-up'
import LostTripContent from './lost-trip-content'

const UndoTripActionPopUp = React.forwardRef(({ tripId }, ref) => {
  const OpenUndoTripActionButton = ({ onClick }) => (
    <MenuItem ref={ref} onClick={onClick}>
      Lost Trip
    </MenuItem>
  )
  return (
    <>
      <PopUp ActionButton={OpenUndoTripActionButton}>
        {handleClose => {
          return <LostTripContent handleClose={handleClose} tripId={tripId} />
        }}
      </PopUp>
    </>
  )
})

export default UndoTripActionPopUp
