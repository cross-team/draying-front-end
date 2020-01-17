# Dispatching Architecture

## Architecture

### Orders

```bash
├── Order
│   └── Container(s)
│   │   └── Trip(s)
│   │   │   └── Leg(s)
│   │   │   │   ├── Start Location
│   │   │   │   └── End Location
```

### Drivers

```bash
├── Driver
│   └── Route(s)
│   │   └── Trip(s)
```

Route - all of a driver's trips in a single day

- Example: Bob (driver) has two trips assigned for tomorrow.  Bob's route for tomorrow is Trip 1 + Trip 2.
- Example: Jorge (driver) has one unfinished trip (Trip X) from two days ago (January 14th).  Jorge's route for January 14th is Trip X.

## Relationships

The aim is to define what actions, types, statuses, stages and other attributes apply to what entities.  

- Trip --> Container
- elivery Location --> Container (i.e. not leg or trip)
- *Add Stop --> Trip (Needs to be confirmed. Is the delivery location modified?)*

## Actions

### Trip Action

- Trip Action: assign a container to a driver, which creates a trip.
- The type of trip created depends on which trip action is selected.
- The number of legs created in the trip depends on the location of the driver, the delivery location of the container, and the type of trip action selected.
- *Some trip actions require an additional action once the current trip action is completed (which should be prompted automatically).*  In this case, the dispatcher should be forced to create the additional action once the current action is completed.  Refer to `...DeliveryOrderDraying/.../nextactions`.

## Scenarios

### Scenario One - 1 trip has 1 leg

Example: Pre-pull container from port to yard

- Order
  - Container
    - Trip 1: "Pre-pull"
      - Leg 1: "Location A -> Location B"
        - Location A "Port - SFCT" (In any trip, the first, or initial, location is the current location of the truck which = last location of past trip)
        - Location B "Yard"

### Scenario Two - 1 trip has 2 legs

Example: Pre-pull container from port to yard, but container is at different yard than truck's current location.  Truck has to go to different port before picking up container.  

- Order
  - Container
    - Trip 1 "Pre-pull"
      - Leg 1: "Location A -> Location B"
        - Location A "Port - Pomtoc"
        - Location B "Port - SFCT"
      - Leg 2: "Location B -> Location C"
        - Location B "Port - SFCT"
        - Location C "Yard"

### Scenario Three - 1 trip has 3 legs

Example: Same as Scenario Two, except driver needs to swap a 40' container for a 20' container, which adds another leg.

- Order
  - Container
    - Trip "Pre-pull"
      - Leg 1: "Location A -> Location B"
        - Location A "Port - Pomtoc"
        - Location B "Yard" (Unhooks 40', hooks 20')
      - Leg 2: "Location B -> Location C"
        - Location B "Yard"
        - Location C "Port - SFCT"
      - Leg 3: "Location C -> Location D"
        - Location C "Port - SFCT"
        - Location D "Yard"

### Scenario Four - The trip's starting point (displayed to the dispatcher) is different than the first leg in the trip

Example: Live unload container at client's location.  The trip starts at Port "SFCT" and ends at Client "Bob's Warehouse", but the driver starts at Port "Pomtoc".

- Order
  - Container
    - Trip "Live Unload"
      - Leg 1: "Location A -> Location B"
        - Location A "Port - Pomtoc"
        - Location B "Yard" (Unhooks 40', hooks 20')
      - Leg 2: "Location B -> Location C"
        - Location B "Yard"
        - Location C "Port - SFCT"
      - **Trip Card Starting Location**
      - Leg 3: "Location C -> Location D"
        - :truck: Location C "Port - SFCT"
        - Location D "Yard"
      - Leg 3: "Location D -> Location E"
        - Location D "Yard"
        - :red_circle: Location E "Bob's Warehouse" (Client)
      - **Trip Card Ending Location**

### Scenario 4 - Multiple Trips

Note: Every container will have a minimum of two trips

Example: Live unload the container at the client's location and then return to the terminal.  The driver is already at the yard where the container is to start the first trip.

- Order
  - Container
    - Trip "Live unload" (Unload the container at the client's location)
      - Leg: Yard -> Client
        - Location A: Yard
        - Location B: Client
    - Trip "Return to Terminal" (Return the container to the port)
      - Leg: Client -> Port
        - Location A: Client
        - Location B: Port

Note: in Scenario 4, Either trip could have multiple legs as exemplified in other scenarios.
