# Dispatching API Reference

Note: it is important to distinguish between a data type and a data point.  Example:

- Current Location Type: "Yard"
- Current Location Name(?): Jim's Yard
- Current Location Address(?): 555 Main Street

See [Dispatching Entities](.../ux-architecture/dispatching/readme.md#dispatching-entities) for a breakdown of 'what is related to what'.

## Document To-Do

## Orders

### [STAGE/STATUS] Delivery Order "DO" Status Based on Container Stage

- [ ] Need to update Container Stage list

Container Stage | id | Delivery Order Status
--- | --- | ---
CANCELED | 1 |
INCOMPLETED | 2 | On the Sea
PENDING | 3 | On the Sea
PLANNED | 4 | To Dispatch
PRE_SCHEDULED | 5 | To Dispatch
DISPATCHED | 6 | Dispatched
DELIVERED | 7 | *not used*
OPEN | 8 | *not used*
COMPLETED | 9 | Completed
REVIEWED | 10 | Reviewed
INVOICED | 11 | Invoiced
PARTIAL_PAID | 12 |
PAID | 12 |

### Client Order Templates

API:

Types: https://dev-mercuriotransport.azurewebsites.net/api/v1/ClientOrderTemplates

ClientOrderTemplateId | Name
--- | --- | ---
1 | Capacity Only
2 | Capacity with fixed price
3 | Capacity with dinamic price

### Delivery Order

API: https://dev-mercuriotransport.azurewebsites.net/api/v1/DeliveryOrder

### Delivery Place

API: https://dev-mercuriotransport.azurewebsites.net/api/v1/DeliveryPlace

### Shipping Lines

API: https://dev-mercuriotransport.azurewebsites.net/api/v1/shippinglines

### Action Location

- [ActionLocation]() - needs further research; see https://dev-mercuriotransport.azurewebsites.net/api/v1/Draying/ActionLocation

### Related APIs

These are APIs that are in the order creation process, but may not be 'order' APIs.  Most are the in the [other](#other) section below.

- [contacttypes](#contact-types)
- [phonetypes](#phone-types)
- [ClientTypes](#client-types)
- [Terms](#terms)
- [ClientPriority](#client-priorities)
- [deliverytypes](#delivery-types)
- [loadtypes](#load-types)

Also, reference [Quickbooks](#quickbooks) APIs below.

- [customersavailablesbyclient](#customers-available-by-client)

## Containers

### Draying

API: https://dev-mercuriotransport.azurewebsites.net/api/v1/draying/ or see [Draying.json](./JSON/Draying.json)

### Draying/ActionLocation

API: https://dev-mercuriotransport.azurewebsites.net/api/v1/Draying/ActionLocation or see [ActionLocation.json](./JSON/ActionLocation.json)

### Draying/Dispatching

API: https://dev-mercuriotransport.azurewebsites.net/api/v1/Draying/Dispatching or see [Dispatching.json](./JSON/Dispatching.json)

### [STATUS] (Container) Port Status

API: https://dev-mercuriotransport.azurewebsites.net/api/v1/containerportstatuses

Reference [containerportstatus.json](../api-reference/JSON/containerportstatuses.json)

id | Name | ShortName
--- | --- | ---
1 | On the Sea | OS
2 | Available | AV
3 | Not released | NR
4 | In Vessel | IV
5 | Out of Port | OP
6 | Street Turn | ST
7 | Returned | RT

### [STAGE/STATUS] Container Current Location (Based on Container Stage & Location Type)

Reference [Delivery Location Types](../api-reference/readme.md#delivery-location-types).

Container Stage | id | Container Current Location
--- | --- | ---
CANCELED | 1 |
INCOMPLETED | 2 |
PENDING | 3 |
PLANNED | 4 |
PRE_SCHEDULED | 5 | To Dispatch
DISPATCHED | 6 | Yard Before
DISPATCHED | 6 | Client
DISPATCHED | 6 | Yard After
DELIVERED | 7 |
OPEN | 8 |
COMPLETED | 9 | Completed
REVIEWED | 10 |
INVOICED | 11 |
PARTIAL_PAID | 12 |
PAID | 12 |

The master stage is indexed with the location type to determine the container stage.

For example:

- If master stage id = 6 (dispatched) and LocationTypeId = 3 (Yard Before), then Container Stage = Yard Before
- If master stage id = 5 (pre-scheduled) then container stage = To dispatch

### Appointment Locations

- Note: in the current UI these are APPT: Appointments.

#### Appointment Location Types

API: 

Types: Reference https://dev-mercuriotransport.azurewebsites.net/api/v1/appointmentlocationtypes or [appointmentlocationtypes.json](./JSON/appointmentlocationtypes.json)

id | Type Name | Short Name
--- | --- | ---
1 | Terminal | T
2 | Client | C
3 | Return Terminal | RT

#### Appointment Types

API: 

Types: Reference https://dev-mercuriotransport.azurewebsites.net/api/v1/appointmenttypes or [appointmenttypes.json](./JSON/appointmenttypes.json)

id | Type Name | Short Name
--- | --- | ---
1 | Delivery | DL
2 | Pickup | PU

### Delivery Locations

Note: Related to container (not trip or leg)

API: https://dev-mercuriotransport.azurewebsites.net/api/v1/deliverylocation/ also in DrayingTripLocation

#### Delivery Location Types

Reference https://dev-mercuriotransport.azurewebsites.net/api/v1/locationtypes or see [locationtypes.json](./JSON/locationtypes.json).

id | Variable (Name, Description)
--- | ---
1 | Default
2 | Client
3 | Yard, Before Client
4 | Depot
5 | Port
6 | Yard, After Client
7 | Client Street Turn

## Trips

### [STATUS] Trip Status

- [ ] Include in UI
- Note: This is the "leg status" column in https://dev-mercuriotransport.azurewebsites.net/Dashboard/DriverPayment 

API: https://dev-mercuriotransport.azurewebsites.net/api/v1/tripstatuses

Reference [tripstatuses.json](../api-reference/JSON/tripstatuses.json)

id | Name
--- | ---
1 | Cancel
2 | Lost
3 | To dispatch *not used*
4 | Pre-dispatch
5 | In movement
6 | Completed
7 | Reviewed *not used*

### Trip Actions

API: https://dev-mercuriotransport.azurewebsites.net/api/v1/tripactions or see [tripactions.json](./JSON/tripactions.json)

id | Type Name | Short Name
--- | --- | ---
1 | Pre-Pull | PP
2 | Full to Yard | FY
3 | Empty to Yard | EY
4 | Live Load | Live L
5 | Live Unload | Live U
6 | Drop | Drop
7 | Yard Stop | YS
8 | Return to Terminal | RT
9 | Return to Depot | RD
10 | Drop Extra Stop | EXD
11 | Live Extra Stop | EXL
12 | Container to Yard | CTY
13 | Skip | SK
14 | Street Turn | ST
15 | Pick At Client | PK
16 | Pick And Return | P&R
17 | Return From Client | RfC

### Trip Locations a.k.a. Trip Points

![trip-locations-api]

- [ ] To be further elaborated on

#### Trip Location Types

- TBD

#### (Trip) Location Actions

- [ ] See screenshot 2:35pm, these are the location lists (leg list)
- [ ] Add to UI

API: https://dev-mercuriotransport.azurewebsites.net/api/v1/Draying/Action or see [Actions.json](./JSON/Actions.json)

id | Name
--- | ---
1 | Pick Empty
2 | Pick Loaded
3 | Drop Empty
4 | Drop Loaded
5 | Load
6 | Unload
7 | Chassis Swap
8 | End of Day
9 | Start Day

**Important Notes:**

- A Draying Trip Starts on location actions 1-6.  We'll call these "main actions".  This is how we determine what location to put on the trip card as the starting location.  
- A Draying Trip does NOT start on location actions 7-9
- Example:
  - If the first location ("Location A" in the first leg) in the trip is "drop empty", the trip card starting location is "Location A".
  - If the first location ("Location A" in the first leg) in the trip is "start day", the trip card starting location **is NOT** "Location A".  It is Location B, or whichever next location has a location action of 1-6.
- After a main action (location actions 1-6) is started, the next location action should be the trip's endpoint, or destination.  *this point may need some clarity*

#### Trip Action Locations

- Not in UI (For dev use only)

## Legs

------

## Drivers

### Driver

API: https://dev-mercuriotransport.azurewebsites.net/api/v1/driver/

### Driver/Capacity

API: https://dev-mercuriotransport.azurewebsites.net/api/v1/driver/capacity

Endpoints

- DriverId
- FirstName
- LastName
- Active
- DailyWorkHours
- StartDateTime
- EndDateTime
- Capacity
- DrayingTrip
- PendingDrayingTripsCount

## Other

### Vehicle

API: https://dev-mercuriotransport.azurewebsites.net/api/v1/Vehicle

API Example: https://dev-mercuriotransport.azurewebsites.net/api/v1/Vehicle?_=1579198012610

Endpoints: TBD

### Shipping Lines

API: https://dev-mercuriotransport.azurewebsites.net/api/v1/shippinglines

Endpoints

- ShippingLineId
- Name
- ShortName
- Url
- Active

### Cost Reasons

API: 

Types: https://dev-mercuriotransport.azurewebsites.net/api/v1/CostReasons

Type |
--- |
Waiting Time |
Container Cleaning |
Scale Cost |
Other Costs |
Storage |
Terminal Fees |
Damaged Chassis |
Damaged Container |
Terminal Fines |
Other Costs |

### Cost Types

API: 

Types: https://dev-mercuriotransport.azurewebsites.net/api/v1/CostTypes

- Trip
- Container

### Company/Me

API: https://dev-mercuriotransport.azurewebsites.net/api/v1/Company/me

### Contact Types

API: 

Types: https://dev-mercuriotransport.azurewebsites.net/api/v1/contacttypes

- Ops / Logistics
- Accounting
- Delivery Orders

### Phone Types

API: 

Types: https://dev-mercuriotransport.azurewebsites.net/api/v1/phonetypes

- Mobile
- Landline

### Client Types

API:

Types: https://dev-mercuriotransport.azurewebsites.net/api/v1/ClientTypes

- Customer
- Broker

### Terms

API: 

Types: https://dev-mercuriotransport.azurewebsites.net/api/v1/Terms

TermId | Name | Days
--- | --- | ---
1 | Due on receip | 0
2 | Net 7 | 7
3 | Net 15 | 15
4 | Net 30 | 30
5 | Net 45 | 45

### Client Priorities

API:

Types: https://dev-mercuriotransport.azurewebsites.net/api/v1/ClientPriorities

ClientPriorityId | Name
--- | --- | ---
1 | Min
2 | Low
3 | Medium
4 | Mid-High
5 | High
6 | Very High
7 | Max

### Delivery Types

API:

Types: https://dev-mercuriotransport.azurewebsites.net/api/v1/deliverytypes

- Business
- Residential

### Load Types

API: 

Types:https://dev-mercuriotransport.azurewebsites.net/api/v1/LoadTypes

- Import
- Export

### Quickbooks

- [ ] Needs to be explored further

#### Customers Available by Client

API: https://dev-mercuriotransport.azurewebsites.net/api/v1/QuickBooks/customersavailablesbyclient

<!--- Image Links Reference -->

[trip-locations-api]: ./assets/trip-locations_2020-01-17.png