import React from 'react'
import PopUp from '../../common/pop-up'
import AutoCompleteTripContent from './auto-complete-trip-content'

const AutoCompleteTripPopUp = ({
  drayingId,
  tripId,
  className,
  Component,
  buttonText,
}) => {
  const OpenChangeTripActionButton = ({ onClick }) => (
    <>
      <Component onClick={onClick} className={className}>
        {buttonText || 'Change Trip Action'}
      </Component>
    </>
  )

  return (
    <>
      <PopUp ActionButton={OpenChangeTripActionButton}>
        {handleClose => {
          return (
            <AutoCompleteTripContent
              handleClose={handleClose}
              drayingId={drayingId}
              tripId={tripId}
            />
          )
        }}
      </PopUp>
    </>
  )
}

export default AutoCompleteTripPopUp
