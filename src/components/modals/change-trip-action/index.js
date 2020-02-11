import React from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import PopUp from '../../common/pop-up'
import ChangeTripActionContent from './change-trip-action-content'

const ChangeTripActionPopUp = React.forwardRef(
  (
    { drayingId, tripId, className, Component, buttonText, isCompletable },
    ref,
  ) => {
    const OpenChangeTripActionButton = ({ onClick }) => (
      <>
        {Component ? (
          <Component ref={ref} onClick={onClick} className={className}>
            {buttonText || 'Change Trip Action'}
          </Component>
        ) : (
          <MenuItem ref={ref} onClick={onClick} className={className}>
            Change Trip Action
          </MenuItem>
        )}
      </>
    )

    return (
      <>
        <PopUp ActionButton={OpenChangeTripActionButton}>
          {handleClose => {
            return (
              <ChangeTripActionContent
                handleClose={handleClose}
                drayingId={drayingId}
                tripId={tripId}
                isCompletable={isCompletable}
              />
            )
          }}
        </PopUp>
      </>
    )
  },
)
export default ChangeTripActionPopUp
