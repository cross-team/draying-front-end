# Dispatching Statuses API Reference

## Container Stages/Statuses

        CANCELED = 1,
        INCOMPLETED = 2,
        PENDING = 3,
        PLANNED = 4,
        PRE_SCHEDULED = 5, 
        DISPATCHED = 6
        DELIVERED = 7,,
        OPEN = 8,
        COMPLETED = 9,
        REVIEWED = 10,
        INVOICED = 11,
        PARTIAL_PAID = 12,
        PAID = 12

## Location Types

        CANCELED = 1,
        INCOMPLETED = 2,
        PENDING = 3,
        PLANNED = 4,
        PRE_SCHEDULED = 5, **"To dispatch" (see location types)**
        DISPATCHED = 6, **"Yard Before", "Client", "Yard After" (see location types)**
        DELIVERED = 7,
        OPEN = 8,
        COMPLETED = 9, **"Completed"**
        REVIEWED = 10,
        INVOICED = 11,
        PARTIAL_PAID = 12,
        PAID = 12

API: https://dev-mercuriotransport.azurewebsites.net/api/v1/locationtypes

See: link (downloaded file)

## Container Status -> DO Status

 CANCELED = 1,
        INCOMPLETED = 2, On the Sea
        PENDING = 3, On the Sea
        PLANNED = 4, To Dispatch
        PRE_SCHEDULED = 5, To Dispatch
        DISPATCHED = 6, Dispatched
        DELIVERED = 7,, **not used
        OPEN = 8,*not used
        COMPLETED = 9, *completed
        REVIEWED = 10, *reviewed
        INVOICED = 11, *invoiced
        PARTIAL_PAID = 12,
        PAID = 12

## Trip Actions

https://dev-mercuriotransport.azurewebsites.net/api/v1/tripactions 

## Location Actions

https://dev-mercuriotransport.azurewebsites.net/api/v1/Draying/Action

Draying Trip Starts on location action 1-6

After I start main action, I am going to destination (next action)


**Yesterday, Today, Tomorrow
Each day is a route



## Statuses / Stages / States

### Trip Status

API: https://dev-mercuriotransport.azurewebsites.net/api/v1/tripstatuses

List of values

- Cancel
- Lost
- To dispatch
- Pre-dispatch
- In movement
- Completed
- Reviewed

Applies to: Trips

Example of usage: ?

### Status

API:

List of values:

Example of usage:




### Port Status

API: https://dev-mercuriotransport.azurewebsites.net/api/v1/containerportstatuses

List:

- 