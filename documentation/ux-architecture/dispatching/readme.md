# Dispatching Architecture

## Orders

1. Order
    1. Container
        1. Trip
            1. Leg
                1. Locations

## Drivers

1. Driver
    1. Route
        1. Trips

Perform a trip action on a container -> assign a trip to a driver

Adding delivery location -> container level (not leg or trip level)

...DeliveryOrderDraying/.../nextactions
Export scenario: pick up from port or depot.

***Some actions require additional action once action is updated.  

***>Yesterday Pending Trips/Today/Tomorrow

## Scenarios

Last updated 2020.01.13

### Scenario 1 - 1 trip has 1 leg

Example: Pre-pull container from port to yard

Order
  ↳ Container
    ↳ Trip 1: "Pre-pull"
      ↳ Leg 1: "Location A -> Location B"
        ↳ Location A "Port - SFCT" (In any trip, the first, or initial, location is the current location of the truck which = last location of past trip)
        ↳ Location B "Yard"

### Scenario 2 - 1 trip has 2 legs

Example: Pre-pull container from port to yard, but container is at different yard than truck's current location.  Truck has to go to different port before picking up container.  

Order
  ↳ Container
    ↳ Trip 1 "Pre-pull"
      ↳ Leg 1: "Location A -> Location B"
        ↳ Location A "Port - Pomtoc"
        ↳ Location B "Port - SFCT"
      ↳ Leg 2: "Location B -> Location C"
        ↳ Location B "Port - SFCT"
        ↳ Location C "Yard"

### Scenario 3 - 1 trip has 3 legs

Example: Same as Scenario #2, except driver needs to swap a 40' container for a 20' container, which adds another leg.

Order
  ↳ Container
    ↳ Trip "Pre-pull"
      ↳ Leg 1: "Location A -> Location B"
        ↳ Location A "Port - Pomtoc"
        ↳ Location B "Yard" (Unhooks 40', hooks 20')
      ↳ Leg 2: "Location B -> Location C"
        ↳ Location B "Yard"
        ↳ Location C "Port - SFCT"
      ↳ Leg 3: "Location C -> Location D"
        ↳ Location C "Port - SFCT"
        ↳ Location D "Yard"

Scenario again

Order
  ↳ Container
    ↳ Trip "Pre-pull"
      ↳ Leg 1: "Location A -> Location B"
        ↳ Location A "Port - Pomtoc"
        ↳ Location B "Yard" (Unhooks 40', hooks 20')
      ↳ Leg 2: "Location B -> Location C"
        ↳ Location B "Yard"
        ↳ Location C "Port - SFCT"
      ↳ Leg 3: "Location C -> Location D" **START HERE**
        ↳ Location C "Port - SFCT"
        ↳ Location D "Yard"
      ↳ Leg 3: "Location C -> Location D"
        ↳ Location D "Yard"
        ↳ Location E "Bob's Warehouse" (Client)

### Scenario 4 - Multiple Trips (Every container will have a minimum of two trips)

Example: Live unload the container at the client's location and then return to the terminal.

Order
  ↳ Container
    ↳ Trip "Live unload" (Unload the container at the client's location)
      ↳ Leg: Location A -> Client
        ↳ Location A
        ↳ Location B: Client
    ↳ Trip "Return to Terminal" (Return the container to the port)
      ↳ Leg: Client -> Port
        ↳ Location A: Client
        ↳ Location B: Port
        *↳ Add stop*

:point_up: Either trip above could have multiple legs as exemplified above.
