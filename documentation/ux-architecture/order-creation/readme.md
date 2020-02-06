# UX Architecture: Order Creation

## APIs Referenced in Dispatching

## APIs Referenced in Order Creation

- contacttypes
- phonetypes
- ClientTypes
- Terms
- ClientOrderTemplates
- ClientPriorities
- QuickBooks/customersavailablesbyclient
- deliverytypes
- Draying/ActionLocation
- shippinglines
- Client
- LoadTypes
- DeliveryLocation
- DeliveryOrder
- DeliveryPlace

### POSTs

#### Steps

1. Input containers

This was the input list:

- IOPO7846578
- MWCU6828889
- DFSU2909403
- MEDU1082583
- NAM3724225
- TCNU4558784

2. POST: retrieveContainerDetails

This was the params list:

["IOPO7846578","MWCU6828889","DFSU2909403","MEDU1082583","TCNU4558784"]

Notice that NAM3724225 is not in this list.  How is this filtered out?

3. POST: CheckContainerNumber (is loaded when container list is populated).  It lists the containers that have errors

For example:

```javascript
{
  "status": true,
  "data": {
    "IOPO7846578": [
      {
        "Container": "IOPO7846578",
        "DeliveryOrderDrayingId": 2,
        "DeliveryOrderId": 2,
        "CreatedOn": "2019-10-23T20:06:16.667",
        "CompanyName": "test company"
      }
    ],
    "MWCU6828889": [
      {
        "Container": "MWCU6828889",
        "DeliveryOrderDrayingId": 21,
        "DeliveryOrderId": 18,
        "CreatedOn": "2019-12-04T21:46:33.313",
        "CompanyName": "test"
      }
    ],
    "TCNU4558784": [
      {
        "Container": "TCNU4558784",
        "DeliveryOrderDrayingId": 34,
        "DeliveryOrderId": 20,
        "CreatedOn": "2019-12-09T21:00:02.373",
        "CompanyName": "Loadsmart, Inc."
      }
    ]
  },
  "message": ""
}
```

The three containers above all had warnings/errors in the list.


#### retrieveContainerDetails

https://dev-mercuriotransport.azurewebsites.net/api/v1/Draying/retrieveContainerDetails/

Params

```javascript
["MEDU3920540","MWCU6828889","ABCD1234567"]
```

Response

```javascript
{
  "status": true,
  "data": {
    "MEDU3920540": {
      "DeliveryOrderDrayingId": 0,
      "DeliveryOrderId": 0,
      "ClientId": null,
      "DeliveryPlaceId": null,
      "DeliveryLocationId": null,
      "DeliveryContactId": null,
      "Booking": null,
      "Container": "MEDU3920540",
      "ContainerSizeId": 1,
      "ContainerTypeId": 1,
      "EstimateAvailableOn": null,
      "LastFreeDay": "2020-02-05T00:00:00",
      "DaysToReturn": null,
      "LastDayToReturn": null,
      "Holds": "NONE",
      "Line": "MSC",
      "Terminal": null,
      "FeesDues": 0.0,
      "FeesPaid": null,
      "PreGate": null,
      "YardLocation": "OFFDOCKMCE",
      "YardStatus": null,
      "LoadEmpty": null,
      "Weight": null,
      "OverDimension": null,
      "Hazmat": null,
      "VoyageCode": "002W",
      "LloydsNo": null,
      "VesselName": "SEALAND MICHIGAN",
      "EstimateDischarge": null,
      "StageId": 0,
      "SCAC": null,
      "EarlyReturnDate": null,
      "CreatedOn": "0001-01-01T00:00:00",
      "CreatedBy": 0,
      "ModifiedOn": "0001-01-01T00:00:00",
      "ModifiedBy": 0,
      "Price": null,
      "PriceSuggested": null,
      "DaysStorage": null,
      "IsLive": null,
      "PrePull": null,
      "YardStop": null,
      "ChassisSplit": null,
      "Urgent": null,
      "AppointmentNeeded": null,
      "AppointmentDate": null,
      "EstimateDeliverTimeFrom": null,
      "EstimateDeliverTimeTo": null,
      "NotReleasedPull": null,
      "TerminalLocationId": 10,
      "Overweight": null,
      "IsOverDimension": null,
      "Available": false,
      "IsHazmat": null,
      "EstimatedDeliveryDateFrom": null,
      "EstimatedDeliveryDateTo": null,
      "CutOffDate": null,
      "ContainerPortStatusId": 5,
      "DontDispatch": false,
      "LoadTypeId": null,
      "ShippingLineId": 1,
      "EstimateTotalMilesRoundTrip": null,
      "EstimateTotalTimeRoundTrip": null,
      "Priority": null,
      "LastDayToPull": null,
      "PullDay": null,
      "SpecificAppoinmentPickUpFromClient": null,
      "PickUpClientDateFrom": null,
      "PickUpClientDateTo": null,
      "PickUpClientTimeFrom": null,
      "PickUpClientTimeTo": null,
      "CurrentLocationId": null,
      "LastDayToDeliverToClient": null,
      "DispatchingPriority": null,
      "ManualTerminal": false,
      "AutoLoad": true,
      "AppointmentTime": null,
      "TerminalLocationNickName": null,
      "DeliveryOrder": null,
      "DeliveryPlace": null,
      "DeliveryLocation": null,
      "ContainerSize": null,
      "ContainerType": null,
      "ContainerStage": null,
      "Client": null,
      "TerminalLocation": null,
      "ReturnTerminal": null,
      "PickUpTerminal": null,
      "ShippingLine": null,
      "ContainerPortStatus": null,
      "CurrentLocation": null,
      "DrayingTrips": [],
      "DeliveryOrderDrayingTripActionPrices": [],
      "DeliveryOrderDrayingExtraStops": [],
      "DrayingAlerts": [],
      "DeliveryOrderDrayingRoundTrips": [],
      "DrayingAppointments": [],
      "Seal": null,
      "CustomsStatus": "CLEARED",
      "LineStatus": "PAID",
      "LastGateMoveStatus": null,
      "LastGateDateTime": null,
      "IsLoaded": null,
      "Order": null,
      "StreetTurn": null,
      "StartLocationStreetTurnId": null,
      "OriginStreetTurnDrayingId": null,
      "OriginStreetTurnLocationNickNameId": null,
      "ReturnTerminalId": null,
      "PickUpTerminalId": null,
      "ReturnDate": null,
      "CompletedDate": null,
      "LastDateTimeToDeliverLive": null,
      "LastDateTimeToDeliverDrop": null,
      "LatestDeliveryDateTimeLive": null,
      "LatestDeliveryDateTimeDrop": null,
      "LatestPickDateTime": null,
      "LatestPullDateTime": null,
      "AvailableDay": null,
      "StreetTurnMuted": false,
      "Reviewed": false,
      "Invoiced": false,
      "Bonded": false,
      "CarrierId": null,
      "BillingReference": null,
      "InstructionsNote": null,
      "VesselETA": null,
      "OriginStreetTurnLocationNickName": null,
      "LoadType": null,
      "SmartTruckingJobTrips": null,
      "EndPoints": null
    },
    "MWCU6828889": {
      "DeliveryOrderDrayingId": 0,
      "DeliveryOrderId": 0,
      "ClientId": null,
      "DeliveryPlaceId": null,
      "DeliveryLocationId": null,
      "DeliveryContactId": null,
      "Booking": null,
      "Container": "MWCU6828889",
      "ContainerSizeId": null,
      "ContainerTypeId": null,
      "EstimateAvailableOn": null,
      "LastFreeDay": null,
      "DaysToReturn": null,
      "LastDayToReturn": null,
      "Holds": null,
      "Line": null,
      "Terminal": null,
      "FeesDues": null,
      "FeesPaid": null,
      "PreGate": null,
      "YardLocation": null,
      "YardStatus": null,
      "LoadEmpty": null,
      "Weight": null,
      "OverDimension": null,
      "Hazmat": null,
      "VoyageCode": null,
      "LloydsNo": null,
      "VesselName": null,
      "EstimateDischarge": null,
      "StageId": 0,
      "SCAC": null,
      "EarlyReturnDate": null,
      "CreatedOn": "0001-01-01T00:00:00",
      "CreatedBy": 0,
      "ModifiedOn": "0001-01-01T00:00:00",
      "ModifiedBy": 0,
      "Price": null,
      "PriceSuggested": null,
      "DaysStorage": null,
      "IsLive": null,
      "PrePull": null,
      "YardStop": null,
      "ChassisSplit": null,
      "Urgent": null,
      "AppointmentNeeded": null,
      "AppointmentDate": null,
      "EstimateDeliverTimeFrom": null,
      "EstimateDeliverTimeTo": null,
      "NotReleasedPull": null,
      "TerminalLocationId": null,
      "Overweight": null,
      "IsOverDimension": null,
      "Available": null,
      "IsHazmat": null,
      "EstimatedDeliveryDateFrom": null,
      "EstimatedDeliveryDateTo": null,
      "CutOffDate": null,
      "ContainerPortStatusId": 0,
      "DontDispatch": false,
      "LoadTypeId": null,
      "ShippingLineId": null,
      "EstimateTotalMilesRoundTrip": null,
      "EstimateTotalTimeRoundTrip": null,
      "Priority": null,
      "LastDayToPull": null,
      "PullDay": null,
      "SpecificAppoinmentPickUpFromClient": null,
      "PickUpClientDateFrom": null,
      "PickUpClientDateTo": null,
      "PickUpClientTimeFrom": null,
      "PickUpClientTimeTo": null,
      "CurrentLocationId": null,
      "LastDayToDeliverToClient": null,
      "DispatchingPriority": null,
      "ManualTerminal": false,
      "AutoLoad": false,
      "AppointmentTime": null,
      "TerminalLocationNickName": null,
      "DeliveryOrder": null,
      "DeliveryPlace": null,
      "DeliveryLocation": null,
      "ContainerSize": null,
      "ContainerType": null,
      "ContainerStage": null,
      "Client": null,
      "TerminalLocation": null,
      "ReturnTerminal": null,
      "PickUpTerminal": null,
      "ShippingLine": null,
      "ContainerPortStatus": null,
      "CurrentLocation": null,
      "DrayingTrips": [],
      "DeliveryOrderDrayingTripActionPrices": [],
      "DeliveryOrderDrayingExtraStops": [],
      "DrayingAlerts": [],
      "DeliveryOrderDrayingRoundTrips": [],
      "DrayingAppointments": [],
      "Seal": null,
      "CustomsStatus": null,
      "LineStatus": null,
      "LastGateMoveStatus": null,
      "LastGateDateTime": null,
      "IsLoaded": null,
      "Order": null,
      "StreetTurn": null,
      "StartLocationStreetTurnId": null,
      "OriginStreetTurnDrayingId": null,
      "OriginStreetTurnLocationNickNameId": null,
      "ReturnTerminalId": null,
      "PickUpTerminalId": null,
      "ReturnDate": null,
      "CompletedDate": null,
      "LastDateTimeToDeliverLive": null,
      "LastDateTimeToDeliverDrop": null,
      "LatestDeliveryDateTimeLive": null,
      "LatestDeliveryDateTimeDrop": null,
      "LatestPickDateTime": null,
      "LatestPullDateTime": null,
      "AvailableDay": null,
      "StreetTurnMuted": false,
      "Reviewed": false,
      "Invoiced": false,
      "Bonded": false,
      "CarrierId": null,
      "BillingReference": null,
      "InstructionsNote": null,
      "VesselETA": null,
      "OriginStreetTurnLocationNickName": null,
      "LoadType": null,
      "SmartTruckingJobTrips": null,
      "EndPoints": null
    },
    "ABCD1234567": {
      "DeliveryOrderDrayingId": 0,
      "DeliveryOrderId": 0,
      "ClientId": null,
      "DeliveryPlaceId": null,
      "DeliveryLocationId": null,
      "DeliveryContactId": null,
      "Booking": null,
      "Container": "ABCD1234567",
      "ContainerSizeId": null,
      "ContainerTypeId": null,
      "EstimateAvailableOn": null,
      "LastFreeDay": null,
      "DaysToReturn": null,
      "LastDayToReturn": null,
      "Holds": null,
      "Line": null,
      "Terminal": null,
      "FeesDues": null,
      "FeesPaid": null,
      "PreGate": null,
      "YardLocation": null,
      "YardStatus": null,
      "LoadEmpty": null,
      "Weight": null,
      "OverDimension": null,
      "Hazmat": null,
      "VoyageCode": null,
      "LloydsNo": null,
      "VesselName": null,
      "EstimateDischarge": null,
      "StageId": 0,
      "SCAC": null,
      "EarlyReturnDate": null,
      "CreatedOn": "0001-01-01T00:00:00",
      "CreatedBy": 0,
      "ModifiedOn": "0001-01-01T00:00:00",
      "ModifiedBy": 0,
      "Price": null,
      "PriceSuggested": null,
      "DaysStorage": null,
      "IsLive": null,
      "PrePull": null,
      "YardStop": null,
      "ChassisSplit": null,
      "Urgent": null,
      "AppointmentNeeded": null,
      "AppointmentDate": null,
      "EstimateDeliverTimeFrom": null,
      "EstimateDeliverTimeTo": null,
      "NotReleasedPull": null,
      "TerminalLocationId": null,
      "Overweight": null,
      "IsOverDimension": null,
      "Available": null,
      "IsHazmat": null,
      "EstimatedDeliveryDateFrom": null,
      "EstimatedDeliveryDateTo": null,
      "CutOffDate": null,
      "ContainerPortStatusId": 0,
      "DontDispatch": false,
      "LoadTypeId": null,
      "ShippingLineId": null,
      "EstimateTotalMilesRoundTrip": null,
      "EstimateTotalTimeRoundTrip": null,
      "Priority": null,
      "LastDayToPull": null,
      "PullDay": null,
      "SpecificAppoinmentPickUpFromClient": null,
      "PickUpClientDateFrom": null,
      "PickUpClientDateTo": null,
      "PickUpClientTimeFrom": null,
      "PickUpClientTimeTo": null,
      "CurrentLocationId": null,
      "LastDayToDeliverToClient": null,
      "DispatchingPriority": null,
      "ManualTerminal": false,
      "AutoLoad": false,
      "AppointmentTime": null,
      "TerminalLocationNickName": null,
      "DeliveryOrder": null,
      "DeliveryPlace": null,
      "DeliveryLocation": null,
      "ContainerSize": null,
      "ContainerType": null,
      "ContainerStage": null,
      "Client": null,
      "TerminalLocation": null,
      "ReturnTerminal": null,
      "PickUpTerminal": null,
      "ShippingLine": null,
      "ContainerPortStatus": null,
      "CurrentLocation": null,
      "DrayingTrips": [],
      "DeliveryOrderDrayingTripActionPrices": [],
      "DeliveryOrderDrayingExtraStops": [],
      "DrayingAlerts": [],
      "DeliveryOrderDrayingRoundTrips": [],
      "DrayingAppointments": [],
      "Seal": null,
      "CustomsStatus": null,
      "LineStatus": null,
      "LastGateMoveStatus": null,
      "LastGateDateTime": null,
      "IsLoaded": null,
      "Order": null,
      "StreetTurn": null,
      "StartLocationStreetTurnId": null,
      "OriginStreetTurnDrayingId": null,
      "OriginStreetTurnLocationNickNameId": null,
      "ReturnTerminalId": null,
      "PickUpTerminalId": null,
      "ReturnDate": null,
      "CompletedDate": null,
      "LastDateTimeToDeliverLive": null,
      "LastDateTimeToDeliverDrop": null,
      "LatestDeliveryDateTimeLive": null,
      "LatestDeliveryDateTimeDrop": null,
      "LatestPickDateTime": null,
      "LatestPullDateTime": null,
      "AvailableDay": null,
      "StreetTurnMuted": false,
      "Reviewed": false,
      "Invoiced": false,
      "Bonded": false,
      "CarrierId": null,
      "BillingReference": null,
      "InstructionsNote": null,
      "VesselETA": null,
      "OriginStreetTurnLocationNickName": null,
      "LoadType": null,
      "SmartTruckingJobTrips": null,
      "EndPoints": null
    }
  },
  "message": ""
}
```

#### CheckContainerNumber

https://dev-mercuriotransport.azurewebsites.net/api/v1/DeliveryOrderDraying/CheckContainerNumber

Params

```javascript
[{"DeliveryOrderDrayingId":0,"DeliveryOrderId":0,"ClientId":null,"DeliveryPlaceId":null,"TerminalLocationId":10,"DeliveryLocationId":null,"DeliveryContactId":null,"ShippingLineId":1,"LoadTypeId":null,"Price":null,"Booking":null,"Container":"MEDU3920540","ContainerTypeId":1,"ContainerSizeId":1,"StageId":0,"EstimateAvailableOn":null,"EstimateDeliverTimeFrom":null,"EstimateDeliverTimeTo":null,"EstimatedDeliveryDateFrom":null,"EstimatedDeliveryDateTo":null,"AppointmentDate":null,"AppointmentTime":null,"CutOffDate":null,"LastFreeDay":"2020-02-05T00:00:00","LastDayToReturn":null,"EarlyReturnDate":null,"Available":false,"IsLive":null,"PrePull":null,"YardStop":null,"ChassisSplit":null,"Urgent":null,"DaysStorage":null,"AppointmentNeeded":null,"VesselName":"SEALAND MICHIGAN","VoyageCode":"002W","Line":"MSC","OverDimension":null,"IsOverDimension":null,"Overweight":null,"Hazmat":null,"IsHazmat":null,"Bonded":false,"ContainerPortStatusId":5,"ContainerPortStatus":{"ContainerPortStatusId":null,"Name":""},"DontDispatch":false,"NotReleasedPull":null,"CurrentLocationId":null,"CurrentLocation":{"LocationTypeId":null,"Name":""},"EstimateTotalTimeRoundTrip":null,"EstimateTotalMilesRoundTrip":null,"PickUpClientDateFrom":null,"PickUpClientDateTo":null,"PickUpClientTimeFrom":null,"PickUpClientTimeTo":null,"SpecificAppoinmentPickUpFromClient":null,"Priority":null,"DispatchingPriority":null,"ManualTerminal":false,"AutoLoad":true,"CompletedDate":null,"ReturnDate":null,"ReturnTerminalId":null,"PickUpTerminalId":null,"PullDay":null,"VesselETA":null,"InstructionsNote":null,"BillingReference":null,"DeliveryOrderDrayingExtraStops":[],"DrayingTrips":[],"DeliveryOrderDrayingTripActionPrices":[],"DrayingAlerts":[],"DrayingAppointments":[],"ContainerType":{"ContainerTypeId":null,"Name":"","ShortName":""},"ContainerSize":{"ContainerSizeId":null,"Name":""},"ContainerStage":{"ContainerStageId":null,"Name":""},"TerminalLocation":{"DeliveryLocationId":null,"DeliveryPlaceId":null,"NickName":"","ShortName":"","LocationId":null,"LocationNickNameId":null,"IsTerminal":true,"IsDepot":true,"Location":{"LocationNickNameId":null,"NickName":"","GoogleAddress":"","LocStreet":"","LocSuite":"","LocCity":"","LocZip":"","LocState":"","LocCountry":"","Partial":false,"Preferred":true,"LocationId":0,"Latitude":"","Longitude":""}},"ReturnTerminal":{"DeliveryLocationId":null,"DeliveryPlaceId":null,"NickName":"","ShortName":"","LocationId":null,"LocationNickNameId":null,"IsTerminal":true,"IsDepot":true,"Location":{"LocationNickNameId":null,"NickName":"","GoogleAddress":"","LocStreet":"","LocSuite":"","LocCity":"","LocZip":"","LocState":"","LocCountry":"","Partial":false,"Preferred":true,"LocationId":0,"Latitude":"","Longitude":""}},"PickUpTerminal":{"DeliveryLocationId":null,"DeliveryPlaceId":null,"NickName":"","ShortName":"","LocationId":null,"LocationNickNameId":null,"IsTerminal":true,"IsDepot":true,"Location":{"LocationNickNameId":null,"NickName":"","GoogleAddress":"","LocStreet":"","LocSuite":"","LocCity":"","LocZip":"","LocState":"","LocCountry":"","Partial":false,"Preferred":true,"LocationId":0,"Latitude":"","Longitude":""}},"ShippingLine":{"ShippingLineId":null,"Name":"","ShortName":"","Url":true},"DeliveryPlace":{"DeliveryPlaceId":null,"DeliveryTypeId":1,"DeliveryTypeName":"","CompanyName":"","Phone":"","Description":"","ModifiedOn":null,"CreatedOn":null,"DeliveryLocations":[]},"DeliveryLocation":{"DeliveryLocationId":null,"DeliveryPlaceId":null,"NickName":"","IsDefault":false,"LocationTypeId":1,"LocationId":null,"LocationNickNameId":null,"ReceivingHoursOpen":"","ReceivingHoursClose":"","Location":{"LocationNickNameId":null,"NickName":"","GoogleAddress":"","LocStreet":"","LocSuite":"","LocCity":"","LocZip":"","LocState":"","LocCountry":"","Partial":false,"Preferred":true,"LocationId":0,"Latitude":"","Longitude":""},"DeliveryContacts":[],"GoogleAddress":"","LocStreet":"","LocSuite":"","LocCity":"","LocZip":"","LocState":"","LocCountry":""},"StreetTurn":null,"OriginStreetTurnDrayingId":null,"OriginStreetTurnLocationNickNameId":null,"StartLocationStreetTurnId":null,"StreetTurnMuted":false,"Client":{"ClientId":null,"ClientTypeId":null,"CompanyName":"","LegalName":"","Note":"","EIN":"","ClientCode":"","Active":true,"IsActive":true,"CreatedOn":null,"CreatedBy":null,"ModifiedBy":null,"ModifiedOn":null,"TermId":null,"ClientPriorityId":null,"InvoiceEmails":"","NotificationEmails":"","LocationAddressId":null,"LocationAddress":{"LocationNickNameId":null,"NickName":"","GoogleAddress":"","LocStreet":"","LocSuite":"","LocCity":"","LocZip":"","LocState":"","LocCountry":"","Partial":false,"Preferred":true,"LocationId":0,"Latitude":"","Longitude":""},"BillingAddressId":null,"BillingAddress":{"LocationNickNameId":null,"NickName":"","GoogleAddress":"","LocStreet":"","LocSuite":"","LocCity":"","LocZip":"","LocState":"","LocCountry":"","Partial":false,"Preferred":true,"LocationId":0,"Latitude":"","Longitude":""},"ClientType":{"ClientTypeId":null,"Name":""},"Term":{"TermId":null,"Name":"","Days":null,"Active":true},"ClientPriority":{"ClientPriorityId":null,"Name":"","Order":null,"Active":true},"CompanyId":null,"CompanyRelatedId":null,"ClientOrderTemplateId":1,"ClientContacts":[]},"LoadType":{"LoadTypeId":null,"Name":"","ShortName":""}},{"DeliveryOrderDrayingId":0,"DeliveryOrderId":0,"ClientId":null,"DeliveryPlaceId":null,"TerminalLocationId":null,"DeliveryLocationId":null,"DeliveryContactId":null,"ShippingLineId":null,"LoadTypeId":null,"Price":null,"Booking":null,"Container":"MWCU6828889","ContainerTypeId":null,"ContainerSizeId":null,"StageId":0,"EstimateAvailableOn":null,"EstimateDeliverTimeFrom":null,"EstimateDeliverTimeTo":null,"EstimatedDeliveryDateFrom":null,"EstimatedDeliveryDateTo":null,"AppointmentDate":null,"AppointmentTime":null,"CutOffDate":null,"LastFreeDay":null,"LastDayToReturn":null,"EarlyReturnDate":null,"Available":null,"IsLive":null,"PrePull":null,"YardStop":null,"ChassisSplit":null,"Urgent":null,"DaysStorage":null,"AppointmentNeeded":null,"VesselName":null,"VoyageCode":null,"Line":null,"OverDimension":null,"IsOverDimension":null,"Overweight":null,"Hazmat":null,"IsHazmat":null,"Bonded":false,"ContainerPortStatusId":0,"ContainerPortStatus":{"ContainerPortStatusId":null,"Name":""},"DontDispatch":false,"NotReleasedPull":null,"CurrentLocationId":null,"CurrentLocation":{"LocationTypeId":null,"Name":""},"EstimateTotalTimeRoundTrip":null,"EstimateTotalMilesRoundTrip":null,"PickUpClientDateFrom":null,"PickUpClientDateTo":null,"PickUpClientTimeFrom":null,"PickUpClientTimeTo":null,"SpecificAppoinmentPickUpFromClient":null,"Priority":null,"DispatchingPriority":null,"ManualTerminal":false,"AutoLoad":false,"CompletedDate":null,"ReturnDate":null,"ReturnTerminalId":null,"PickUpTerminalId":null,"PullDay":null,"VesselETA":null,"InstructionsNote":null,"BillingReference":null,"DeliveryOrderDrayingExtraStops":[],"DrayingTrips":[],"DeliveryOrderDrayingTripActionPrices":[],"DrayingAlerts":[],"DrayingAppointments":[],"ContainerType":{"ContainerTypeId":null,"Name":"","ShortName":""},"ContainerSize":{"ContainerSizeId":null,"Name":""},"ContainerStage":{"ContainerStageId":null,"Name":""},"TerminalLocation":{"DeliveryLocationId":null,"DeliveryPlaceId":null,"NickName":"","ShortName":"","LocationId":null,"LocationNickNameId":null,"IsTerminal":true,"IsDepot":true,"Location":{"LocationNickNameId":null,"NickName":"","GoogleAddress":"","LocStreet":"","LocSuite":"","LocCity":"","LocZip":"","LocState":"","LocCountry":"","Partial":false,"Preferred":true,"LocationId":0,"Latitude":"","Longitude":""}},"ReturnTerminal":{"DeliveryLocationId":null,"DeliveryPlaceId":null,"NickName":"","ShortName":"","LocationId":null,"LocationNickNameId":null,"IsTerminal":true,"IsDepot":true,"Location":{"LocationNickNameId":null,"NickName":"","GoogleAddress":"","LocStreet":"","LocSuite":"","LocCity":"","LocZip":"","LocState":"","LocCountry":"","Partial":false,"Preferred":true,"LocationId":0,"Latitude":"","Longitude":""}},"PickUpTerminal":{"DeliveryLocationId":null,"DeliveryPlaceId":null,"NickName":"","ShortName":"","LocationId":null,"LocationNickNameId":null,"IsTerminal":true,"IsDepot":true,"Location":{"LocationNickNameId":null,"NickName":"","GoogleAddress":"","LocStreet":"","LocSuite":"","LocCity":"","LocZip":"","LocState":"","LocCountry":"","Partial":false,"Preferred":true,"LocationId":0,"Latitude":"","Longitude":""}},"ShippingLine":{"ShippingLineId":null,"Name":"","ShortName":"","Url":true},"DeliveryPlace":{"DeliveryPlaceId":null,"DeliveryTypeId":1,"DeliveryTypeName":"","CompanyName":"","Phone":"","Description":"","ModifiedOn":null,"CreatedOn":null,"DeliveryLocations":[]},"DeliveryLocation":{"DeliveryLocationId":null,"DeliveryPlaceId":null,"NickName":"","IsDefault":false,"LocationTypeId":1,"LocationId":null,"LocationNickNameId":null,"ReceivingHoursOpen":"","ReceivingHoursClose":"","Location":{"LocationNickNameId":null,"NickName":"","GoogleAddress":"","LocStreet":"","LocSuite":"","LocCity":"","LocZip":"","LocState":"","LocCountry":"","Partial":false,"Preferred":true,"LocationId":0,"Latitude":"","Longitude":""},"DeliveryContacts":[],"GoogleAddress":"","LocStreet":"","LocSuite":"","LocCity":"","LocZip":"","LocState":"","LocCountry":""},"StreetTurn":null,"OriginStreetTurnDrayingId":null,"OriginStreetTurnLocationNickNameId":null,"StartLocationStreetTurnId":null,"StreetTurnMuted":false,"Client":{"ClientId":null,"ClientTypeId":null,"CompanyName":"","LegalName":"","Note":"","EIN":"","ClientCode":"","Active":true,"IsActive":true,"CreatedOn":null,"CreatedBy":null,"ModifiedBy":null,"ModifiedOn":null,"TermId":null,"ClientPriorityId":null,"InvoiceEmails":"","NotificationEmails":"","LocationAddressId":null,"LocationAddress":{"LocationNickNameId":null,"NickName":"","GoogleAddress":"","LocStreet":"","LocSuite":"","LocCity":"","LocZip":"","LocState":"","LocCountry":"","Partial":false,"Preferred":true,"LocationId":0,"Latitude":"","Longitude":""},"BillingAddressId":null,"BillingAddress":{"LocationNickNameId":null,"NickName":"","GoogleAddress":"","LocStreet":"","LocSuite":"","LocCity":"","LocZip":"","LocState":"","LocCountry":"","Partial":false,"Preferred":true,"LocationId":0,"Latitude":"","Longitude":""},"ClientType":{"ClientTypeId":null,"Name":""},"Term":{"TermId":null,"Name":"","Days":null,"Active":true},"ClientPriority":{"ClientPriorityId":null,"Name":"","Order":null,"Active":true},"CompanyId":null,"CompanyRelatedId":null,"ClientOrderTemplateId":1,"ClientContacts":[]},"LoadType":{"LoadTypeId":null,"Name":"","ShortName":""}}]
```

Response

```javascript
{
  "status": true,
  "data": {
    "MEDU3920540": [
      {
        "Container": "MEDU3920540",
        "DeliveryOrderDrayingId": 84,
        "DeliveryOrderId": 45,
        "CreatedOn": "2020-01-30T23:57:52.187",
        "CompanyName": "Test Corp"
      }
    ],
    "MWCU6828889": [
      {
        "Container": "MWCU6828889",
        "DeliveryOrderDrayingId": 21,
        "DeliveryOrderId": 18,
        "CreatedOn": "2019-12-04T21:46:33.313",
        "CompanyName": "test"
      }
    ]
  },
  "message": ""
}
```

## Order Entry Documentation by Richard

# Automatic Terminals

These terminals allow auto populating of container information from the scrapers: 
    Florida International Terminal
    POMTOC
    SFCT
    Port Everglades (PET)
If the Container is still at sea it will prompt with the following:

“The container specs will be fetch automatically as soon as the container is in vessel at the terminal”

# Manual Terminals

All other terminals will require manual input of the following information:
Terminal
Shipping Line
Container Size
Container Type
Last Free Day (import) / Cut Off Day (export)

When a container that was in the sea enters the terminal as either : not released or available, this is not automatically registered in manual terminals. They require feedback from the shipper to the dispatcher, or the dispatcher calling the terminal for updates.  “Manual Terminals” may require a tag or way of keeping track of them.

# Container Input

When a container is introduced into the system it can be input with the body of an email. The system will recognize a container that has:
4 letters at the beginning
7 numbers afterwards
Corresponds to the naming convention of one of the 4 automatic terminals. 

# Booking #

A booking number may be used for multiple orders.

# Container #

A container number can only be used on one order

# Reference

Shippers have internal systems that generate order numbers, this is a field for them to place that information

# Load Type

Import - Displays container number input box.
Export - Displays Booking number input and container quantities.

# Container Information

Appointment date and time
Last Free Day / Cut Off Day
Terminal
Shipping Line
Port Status
Tags (Hazard, Overweight, Bonded, Urgent, Not Released Pull etc.)

# Delivery Instructions

Delivery Location (Add a Location if necessary)
Location- Action (Live or Drop)
Tags (Hazard, Overweight, Bonded, Urgent, Not Release Pull, etc.)
Add Extra Stop

# Actions

Plan - Container Instructions
Clean - Container Instructions
Save - Delivery Order
Cancel - Delivery Order

# Special Instructions

Field to input container specific notes, or instructions
Temperature
GPS / insurance specifications
Miscellaneous

# Multiple Select

Average containers per order is around 7
Sometimes containers in an order can be 50 or more
Multiple select must allow ( All Containers, Selected Containers, This Container) in order to enter delivery instructions
There must be an indicator to the user that a container has been configured, and another to prompt the user to configure
