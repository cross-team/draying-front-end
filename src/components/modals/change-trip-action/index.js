import React from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import PopUp from '../../common/pop-up'
import ChangeTripActionContent from './change-trip-action-content'

const ChangeTripActionPopUp = React.forwardRef(
  ({ OpenPopUpButton, drayingId }, ref) => {
    const OpenChangeTripActionButton = ({ onClick }) => (
      <MenuItem ref={ref} onClick={onClick}>
        Change Trip Action
      </MenuItem>
    )
    return (
      <>
        <PopUp ActionButton={OpenChangeTripActionButton}>
          {handleClose => {
            return (
              <ChangeTripActionContent
                handleClose={handleClose}
                drayingId={drayingId}
              />
            )
          }}
        </PopUp>
      </>
    )
  },
)
export default ChangeTripActionPopUp
