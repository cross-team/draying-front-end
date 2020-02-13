export const tripIsCompletable = trip => +trip.status.id === 4

export const tripHasSequenceAction = function(trip, endTripActionLocations) {
  var found = endTripActionLocations.find(function(location) {
    return location.id === trip.tripActionLocation.id
  })
  if (found) {
    return found.hasSequenceAction
  }
  return false
}
