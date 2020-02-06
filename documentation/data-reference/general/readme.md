# General API Reference

APIs Referenced

- contacttypes
- phonetypes
- ClientTypes
- ClientPriorities
- Terms
- LoadTypes
- QuickBooks/customersavailablesbyclient

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
