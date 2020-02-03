# Dispatching API Reference

Note: it is important to distinguish between a data type and a data point.  Example:

- Current Location Type: "Yard"
- Current Location Name(?): Jim's Yard
- Current Location Address(?): 555 Main Street

See [Dispatching Entities](.../ux-architecture/dispatching/readme.md#dispatching-entities) for a breakdown of 'what is related to what'.

## Document To-Do & Questions

## Orders

### [STATUS] Delivery Order "DO" Status Based on Container Stage

API: Data -> Drayings -> Draying "0" -> ContainerStage -> ContainerStageId "6"

Example of API: https://dev-mercuriotransport.azurewebsites.net/api/v1/Draying/dispatching?ContainerStages=6&ContainerTypes=&CurrentLocationTypes=&InMovement=true&Sort=false&PageSize=0&PageNumber=1&Count=17&_=1580154399315

ContainerStage | Id | Delivery Order Status
--- | --- | ---
CANCELED | 1 |
PENDING | 2 | On the Sea
CONFIGURED | 3 | On the Sea
PLANNED | 4 | To Dispatch
TO DISPATCH | 5 | To Dispatch
DISPATCHED | 6 | Dispatched
STARTED/DELIVERED | 7 | *not used*
OPEN | 8 | *not used*
COMPLETED | 9 | Completed
REVIEWED | 10 | Reviewed
INVOICED | 11 | Invoiced
PARTIAL_PAID | 12 |
PAID | 13 |

### Client Order Templates

API:

Types: [https://dev-mercuriotransport.azurewebsites.net/api/v1/ClientOrderTemplates](https://dev-mercuriotransport.azurewebsites.net/api/v1/ClientOrderTemplates) or see [ClientOrderTemplates.json](./JSON/ClientOrderTemplates.json).

ClientOrderTemplateId | Name
--- | --- | ---
1 | Capacity Only
2 | Capacity with fixed price
3 | Capacity with dinamic price

### Delivery Order

API: [https://dev-mercuriotransport.azurewebsites.net/api/v1/DeliveryOrder](https://dev-mercuriotransport.azurewebsites.net/api/v1/DeliveryOrder)

This is the main API for delivery orders.

### Delivery Place

API: [https://dev-mercuriotransport.azurewebsites.net/api/v1/DeliveryPlace](https://dev-mercuriotransport.azurewebsites.net/api/v1/DeliveryPlace) or see [DeliveryPlace.json](./JSON/DeliveryPlace.json).

This is a list of delivery places.

### Shipping Lines

This is a list of shipping lines.

API: [https://dev-mercuriotransport.azurewebsites.net/api/v1/shippinglines](https://dev-mercuriotransport.azurewebsites.net/api/v1/shippinglines) or see [shippinglines.json](./JSON/shippinglines.json).

Endpoints

- ShippingLineId
- Name
- ShortName
- Url
- Active

### Action Location

- [ ] Needs further defining.

API: [https://dev-mercuriotransport.azurewebsites.net/api/v1/Draying/ActionLocation](https://dev-mercuriotransport.azurewebsites.net/api/v1/Draying/ActionLocation) or see [ActionLocation.json](./JSON/ActionLocation.json).

Types: ?

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

### Container Stages

`ContainerStageId` a.k.a. `StageId`

Previously known as 'master stage', a number of other stages and statuses are determined by the ContainerStageId.

API: Data > Route "0" -> DrayingTrips -> Trip "0" -> DeliveryOrderDraying().StageId()

Reference: [https://dev-mercuriotransport.azurewebsites.net/api/v1/containerstages](https://dev-mercuriotransport.azurewebsites.net/api/v1/containerstages) or [containerstages.json](../api-reference/JSON/containerstages.json)

ContainerStage | Id
--- | ---
CANCELED | 1 |
PENDING | 2 |
CONFIGURED | 3 |
PLANNED | 4 |
TO DISPATCH | 5 |
DISPATCHED | 6 |
STARTED/DELIVERED | 7 |
OPEN | 8 |
COMPLETED | 9 |
REVIEWED | 10 |
INVOICED | 11 |
PARTIAL_PAID | 12 |
PAID | 13 |

### Delivery Locations

`LocationTypeId` a.k.a. `CurrentLocationId`

Note: Related to container (not trip or leg)

API: [https://dev-mercuriotransport.azurewebsites.net/api/v1/deliverylocation/](https://dev-mercuriotransport.azurewebsites.net/api/v1/deliverylocation/) also in DrayingTripLocation.  Reference [DeliveryLocation.json](./JSON/DeliveryLocation.json).

API: Data > Route "0" -> DrayingTrips -> Trip "0" -> DeliveryOrderDraying().CurrentLocationId()

Types: Reference [https://dev-mercuriotransport.azurewebsites.net/api/v1/locationtypes](https://dev-mercuriotransport.azurewebsites.net/api/v1/locationtypes) or see [locationtypes.json](./JSON/locationtypes.json).

id | LocationType
--- | ---
1 | Default
2 | Client
3 | Yard, Before Client
4 | Depot
5 | Port
6 | Yard, After Client
7 | Client Street Turn

### Container Types

API:

Types: [https://dev-mercuriotransport.azurewebsites.net/api/v1/containertypes](https://dev-mercuriotransport.azurewebsites.net/api/v1/containertypes) or see [containertypes.json](./JSON/containertypes.json)

ContainerTypeId | Name | Short Name
--- | --- | ---
1 | Standard | ST
2 | High Cube | HC
3 | Reefer | RF
4 | Tank | TNK
5 | Flatrack | FLAT
6 | Open Top | OPEN
7 | FlatBed | FLB
8 | Non-Operating Reefers | NOR

### Container Sizes

API:

Types: [https://dev-mercuriotransport.azurewebsites.net/api/v1/containersizes](https://dev-mercuriotransport.azurewebsites.net/api/v1/containersizes) or see [containersizes.json](./JSON/containersizes.json)

ContainerSizeId | Name
--- | ---
1 | 20'
2 | 40'
3 | 45'
4 | 53'

### Draying

API: https://dev-mercuriotransport.azurewebsites.net/api/v1/draying/ or see [Draying.json](./JSON/Draying.json)

#### Draying -> DrayingAlert

API: Same as [Draying](#draying).

API Path: data -> drayings -> # (draying record) -> DrayingAlerts -> # (DrayingAlert record)

Example of a DrayingAlert record:

```javascript
{
            "DrayingAlertId": 14,
            "DeliveryOrderDrayingId": 36,
            "DateFrom": "2020-02-03T11:16:41.487",
            "Description": "This is a test created by Jason",
            "Active": true,
            "CreatedOn": "2020-02-03T16:16:52.033",
            "CreatedBy": 25,
            "ModifiedOn": "2020-02-03T16:16:52.033",
            "ModifiedBy": 25
          },
```

### Draying/ActionLocation

API: https://dev-mercuriotransport.azurewebsites.net/api/v1/Draying/ActionLocation or see [ActionLocation.json](./JSON/ActionLocation.json)

### Draying/Dispatching

API: https://dev-mercuriotransport.azurewebsites.net/api/v1/Draying/Dispatching or see [Dispatching.json](./JSON/Dispatching.json)

### DeliveryOrderDraying

API: https://dev-mercuriotransport.azurewebsites.net/api/v1/DeliveryOrderDraying

#### DeliveryOrderDraying -> DrayingCost

API: Same as [DeliveryOrderDraying](#DeliveryOrderDraying)

API path:

Example of DrayingCost

```js
 "DrayingCosts": [

          {

            "DrayingCostId": 1231,

            "DeliveryOrderDrayingId": 36,

            "DrayingTripId": 853,

            "CostReasonId": 2,

            "ShipperCharges": 0.0,

            "ShipperChargesSuggested": null,

            "DriverPayment": null,

            "DriverPaymentSuggested": 35.0,

            "CompanyCost": 0.0,

            "CompanyCostSuggested": null,

            "InvoiceDescription": null,

            "InternalDescription": null,

            "CreatedOn": "2020-01-24T18:42:14.117",

            "CreatedBy": 5,

            "ModifiedOn": "2020-02-03T16:54:09.87",

            "ModifiedBy": 25,

            "Reviewed": false,

            "DeliveryOrderDraying": null,

            "DrayingTrip": null,

            "CostReason": {

              "CostReasonId": 2,

              "CostTypeId": 1,

              "Name": "Driver",

              "Active": false,

              "Orden": 1,

              "CostType": {

                "CostTypeId": 1,

                "Name": "Trip",

                "Active": true

              }

            }

          },

```

### [STATUS] Port Status (Container)

API: [https://dev-mercuriotransport.azurewebsites.net/api/v1/containerportstatuses](https://dev-mercuriotransport.azurewebsites.net/api/v1/containerportstatuses)

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

### [STATUS] Container Current Location (Based on Container Stage & Location Type)

#### API

The API is in the Route API: https://dev-mercuriotransport.azurewebsites.net/api/v1/Route

but...

We need to see the route of a specific driver.  For example: https://dev-mercuriotransport.azurewebsites.net/api/v1/Route?DriverId=49&FromDate=2020-01-27T00:00:00-05:00&ToDate=2020-01-27T23:59:59-05:00&ShowPending=true&OrderBy=date&_=1580136143642

#### How to determine the container current location

These are the stages for the trip/container card in the existing design.  They are:

- To Dispatch
- Yard Before
- Client
- Yard After
- Completed

If ContainerStageId < 6, Container Current Location is To Dispatch

If ContainerStageId = 6, reference the LocationTypeId per the table below to determine the Container Current Location

If ContainerStageId > 6, Container Current Location is Completed

For example:

- If ContainerStageId = 6 (dispatched) and LocationTypeId = 3 (Yard Before), then container current location = Yard Before
- If ContainerStageId = 5 (pre-scheduled) then container current location = To dispatch

#### Index

ContainerStage | ContainerStageId | LocationType | LocationTypeId | Container Current Location
--- | --- | --- | --- | ---
CANCELED | 1 |
PENDING | 2 | | | To Dispatch? |
CONFIGURED | 3 | | | To Dispatch? |
PLANNED | 4 | | | To Dispatch? |
TO DISPATCH | 5 | | | To Dispatch |
DISPATCHED | 6 | Depot | 4 | To Dispatch |
DISPATCHED | 6 | Port | 5 | To Dispatch |
DISPATCHED | 6 | Yard, Before Client | 3 | Yard Before |
DISPATCHED | 6 | Client | 2 | Client |
DISPATCHED | 6 | Yard, After Client | 6 | Yard After |
STARTED/DELIVERED | 7 |
OPEN | 8 |
COMPLETED | 9 | | | Completed |
REVIEWED | 10 | | | Completed |
INVOICED | 11 | | | Completed? |
PARTIAL_PAID | 12 | | | Completed? |
PAID | 13 | | | Completed? |

LocationTypes not used in the index above

id | LocationType
--- | ---
1 | Default
7 | Client Street Turn

### Appointment Locations

- Note: in the current UI these are APPT: Appointments.

#### Appointment Location Types

API:

Types: Reference [https://dev-mercuriotransport.azurewebsites.net/api/v1/appointmentlocationtypes](https://dev-mercuriotransport.azurewebsites.net/api/v1/appointmentlocationtypes) or [appointmentlocationtypes.json](./JSON/appointmentlocationtypes.json)

id | Type Name | Short Name
--- | --- | ---
1 | Terminal | T
2 | Client | C
3 | Return Terminal | RT

#### Appointment Types

API:

Types: Reference [https://dev-mercuriotransport.azurewebsites.net/api/v1/appointmenttypes](https://dev-mercuriotransport.azurewebsites.net/api/v1/appointmenttypes) or [appointmenttypes.json](./JSON/appointmenttypes.json)

id | Type Name | Short Name
--- | --- | ---
1 | Delivery | DL
2 | Pickup | PU

## Trips

### [STATUS] Trip Status

- Note: This is the "leg status" column in https://dev-mercuriotransport.azurewebsites.net/Dashboard/DriverPayment 

API:

Types: [https://dev-mercuriotransport.azurewebsites.net/api/v1/tripstatuses](https://dev-mercuriotransport.azurewebsites.net/api/v1/tripstatuses) or see  [tripstatuses.json](../api-reference/JSON/tripstatuses.json)

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

API: [https://dev-mercuriotransport.azurewebsites.net/api/v1/tripactions](https://dev-mercuriotransport.azurewebsites.net/api/v1/tripactions) or see [tripactions.json](./JSON/tripactions.json)

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

API:

- [ ] To be further elaborated on

Types:

- [ ] To be further elaborated on

#### (Trip) Location Actions

API:

Types: [https://dev-mercuriotransport.azurewebsites.net/api/v1/Draying/Action](https://dev-mercuriotransport.azurewebsites.net/api/v1/Draying/Action) or see [Action.json](./JSON/Action.json)

DrayingActionId | Name | Time
--- | --- | ---
1 | Pick Empty | 15
2 | Pick Loaded | 15
3 | Drop Empty | 20
4 | Drop Loaded | 20
5 | Load | 90
6 | Unload | 90
7 | Chassis Swap | 15
8 | End of Day | 15
9 | Start Day | 15

**Important Notes:**

- A Draying Trip Starts on location actions 1-6.  We'll call these "main actions".  This is how we determine what location to put on the trip card as the starting location.  
- A Draying Trip does NOT start on location actions 7-9
- Example:
  - If the first location ("Location A" in the first leg) in the trip is "drop empty", the trip card starting location is "Location A".
  - If the first location ("Location A" in the first leg) in the trip is "start day", the trip card starting location **is NOT** "Location A".  It is Location B, or whichever next location has a location action of 1-6.
- After a main action (location actions 1-6) is started, the next location action should be the trip's endpoint, or destination.  *this point may need some clarity*

#### Trip Action Locations

- [ ] **Ask Sergio**

## Legs

------

## Drivers

### Driver

API: https://dev-mercuriotransport.azurewebsites.net/api/v1/driver/

### Driver/Capacity

- [ ] To be further elaborated on

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
