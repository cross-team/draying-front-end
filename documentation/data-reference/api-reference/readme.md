# API Reference

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

API: https://dev-mercuriotransport.azurewebsites.net/api/v1/locationtypes 

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

API: https://dev-mercuriotransport.azurewebsites.net/api/v1/CostReasons

Variables

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

API: https://dev-mercuriotransport.azurewebsites.net/api/v1/CostTypes

Variables

- Trip
- Container

### Company/Me

API: https://dev-mercuriotransport.azurewebsites.net/api/v1/Company/me

### Contact Types

API: https://dev-mercuriotransport.azurewebsites.net/api/v1/contacttypes

Variables

- Ops / Logistics
- Accounting
- Delivery Orders

### Phone Types

API: https://dev-mercuriotransport.azurewebsites.net/api/v1/phonetypes

Variables

- Mobile
- Landline
