# Dispatching Statuses API Reference

## Document To-Do

- [ ] clarify trip status - @jas0nmjames
- [ ] clarify port status - @jas0nmjames

## Container Stages/Statuses

*We should define whether these are stages or statuses or identify another term for these 'master' stages.  I'm going to call them **master stages** in the meantime for clarity.

### New List - Added 1/17/2020**

Reference: https://dev-mercuriotransport.azurewebsites.net/api/v1/containerstages or [containerstages.json](../api-reference/JSON/containerstages.json)

Items updated 1/17/2020 are **in bold.**  Ids in new list are equivalent to ids in old list.

Master Stage | id
--- | ---
CANCELED | 1 |
**PENDING** | 2 |
**CONFIGURED** | 3 |
PLANNED | 4 |
**TO DISPATCH** | 5 |
DISPATCHED | 6 |
**STARTED/DELIVERED** | 7 |
OPEN | 8 |
COMPLETED | 9 |
REVIEWED | 10 |
INVOICED | 11 |
PARTIAL_PAID | 12 |
PAID | 13 |

### Old List

Master Stage | id
--- | ---
CANCELED | 1 |
INCOMPLETED | 2 |
PENDING | 3 |
PLANNED | 4 |
PRE_SCHEDULED | 5 |
DISPATCHED | 6 |
DELIVERED | 7 |
OPEN | 8 |
COMPLETED | 9 |
REVIEWED | 10 |
INVOICED | 11 |
PARTIAL_PAID | 12 |
PAID | 12 ***(Should this be "13"?)*** |

## Container Stage Based on Master Stage & Location Type

The master stage is indexed with the location type to determine the container stage.

For example

- If master stage id = 6 (dispatched) and LocationTypeId = 3 (Yard Before), then Container Stage = Yard Before
- If master stage id = 5 (pre-scheduled) then container stage = To dispatch

Reference [Delivery Location Types](../api-reference/readme.md#delivery-location-types) in the api-reference readme.

Master Stage | id | Container Stage
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

## Delivery Order "DO" Status Based on Master Stage

Master Stage | id | Container Stage
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

## Trip Status

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

### Container Port Status

*How port status is mapped needs to be defined.  Is it related to master stage?*

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
