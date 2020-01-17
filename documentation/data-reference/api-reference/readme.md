# API Reference

## Document To-Do

- [ ] Add images of old designs with markup referencing endpoints - @jas0nmjames
- [ ] Add images of new designs with endpoints mapped - @jas0nmjames

## Drayings

### Draying

API: https://dev-mercuriotransport.azurewebsites.net/api/v1/draying/

Endpoints: See [Draying.json](./JSON/Draying.json)

### Draying/ActionLocation

API: https://dev-mercuriotransport.azurewebsites.net/api/v1/Draying/ActionLocation

Endpoints: See [ActionLocation.json](./JSON/ActionLocation.json)

### Draying/Dispatching

API: https://dev-mercuriotransport.azurewebsites.net/api/v1/Draying/Dispatching

Endpoints: See [Dispatching.json](./JSON/Dispatching.json)

### Trip Actions

API: 

Variables: https://dev-mercuriotransport.azurewebsites.net/api/v1/tripactions or see [tripactions.json](./JSON/tripactions.json)

id | Variable Name | Short Name
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

### Location Actions

API: 

Variables: https://dev-mercuriotransport.azurewebsites.net/api/v1/Draying/Action or see [Actions.json](./JSON/Actions.json)

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

### Appointment Locations?

TBD
TBD
TBD


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

### Delivery locations

API: https://dev-mercuriotransport.azurewebsites.net/api/v1/deliverylocation/

### Delivery Location Types

*Is this related to the container or the trip?*

API: 

Variables: https://dev-mercuriotransport.azurewebsites.net/api/v1/locationtypes

Or see [locationtypes.json](./JSON/locationtypes.json).

id | Variable (Name, Description)
--- | ---
1 | Default ***What is this use case?***
2 | Client
3 | Yard, Before Client
4 | Depot
5 | Port
6 | Yard, After Client
7 | Client Street Turn

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

Variables: https://dev-mercuriotransport.azurewebsites.net/api/v1/CostReasons

- Waiting Time
- Container Cleaning
- Scale Cost
- Other Costs
- Storage
- Terminal Fees
- Damaged Chassis
- Damaged Container
- Terminal Fines
- Other Costs

### Cost Types

API: 

Variables: https://dev-mercuriotransport.azurewebsites.net/api/v1/CostTypes

- Trip
- Container

### Company/Me

API: https://dev-mercuriotransport.azurewebsites.net/api/v1/Company/me

### Contact Types

API: 

Variables: https://dev-mercuriotransport.azurewebsites.net/api/v1/contacttypes

- Ops / Logistics
- Accounting
- Delivery Orders

### Phone Types

API: 

Variables: https://dev-mercuriotransport.azurewebsites.net/api/v1/phonetypes

- Mobile
- Landline
