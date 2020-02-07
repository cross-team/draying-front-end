export const getLastTrip = draying => {
  let lastTrip = null
  draying.trips.forEach(function(trip) {
    if (+trip.status.id >= 3) {
      lastTrip = trip
    }
  })
  return lastTrip
}

export const drayingIsPreDispatched = draying => {
  let res = false

  draying.trips.forEach(function(trip) {
    if (+trip.status.id === 4) {
      res = true
    }
  })
  return res
}
