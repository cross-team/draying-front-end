import React from 'react'
import DriversCapacity from './drivers-capacity'
import DriverTrips from './driver-trips'
import Shell from '../columns/shell'

export default function Drivers() {

  return (
    <Shell left={<DriversCapacity />} middle={<DriverTrips />} />
  )
}
