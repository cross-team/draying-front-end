import React from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import PopUp from '../../common/pop-up'
import UndoTripActionContent from './undo-trip-action-content'

const UndoTripActionPopUp = React.forwardRef(({ drayingId }, ref) => {
  const OpenUndoTripActionButton = ({ onClick }) => (
    <MenuItem ref={ref} onClick={onClick}>
      Undo Trip Action
    </MenuItem>
  )
  return (
    <>
      <PopUp ActionButton={OpenUndoTripActionButton}>
        {handleClose => {
          return (
            <UndoTripActionContent
              handleClose={handleClose}
              drayingId={drayingId}
            />
          )
        }}
      </PopUp>
    </>
  )
})

export default UndoTripActionPopUp
