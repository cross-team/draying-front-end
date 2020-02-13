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

export const getClientDestinations = draying => {
  const locations = []
  locations.push(draying.deliveryLocation)
  if (draying.extraStops != null) {
    draying.extraStops.forEach(function(extraStop) {
      if (extraStop.status.id > 2) {
        locations.push(extraStop.deliveryLocation)
      }
    })
  }

  return locations
}
