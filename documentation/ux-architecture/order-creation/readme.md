# UX Architecture: Order Creation

## Order Entry Documentation by Richard

### Automatic Terminals

These terminals allow auto populating of container information from the scrapers: 
    Florida International Terminal
    POMTOC
    SFCT
    Port Everglades (PET)
If the Container is still at sea it will prompt with the following:

“The container specs will be fetch automatically as soon as the container is in vessel at the terminal”

### Manual Terminals

All other terminals will require manual input of the following information:
Terminal
Shipping Line
Container Size
Container Type
Last Free Day (import) / Cut Off Day (export)

When a container that was in the sea enters the terminal as either : not released or available, this is not automatically registered in manual terminals. They require feedback from the shipper to the dispatcher, or the dispatcher calling the terminal for updates.  “Manual Terminals” may require a tag or way of keeping track of them.

### Container Input

When a container is introduced into the system it can be input with the body of an email. The system will recognize a container that has:
4 letters at the beginning
7 numbers afterwards
Corresponds to the naming convention of one of the 4 automatic terminals. 

### Booking #

A booking number may be used for multiple orders.

### Container #

A container number can only be used on one order

### Reference

Shippers have internal systems that generate order numbers, this is a field for them to place that information

### Load Type

Import - Displays container number input box.
Export - Displays Booking number input and container quantities.

### Container Information

Appointment date and time
Last Free Day / Cut Off Day
Terminal
Shipping Line
Port Status
Tags (Hazard, Overweight, Bonded, Urgent, Not Released Pull etc.)

### Delivery Instructions

Delivery Location (Add a Location if necessary)
Location- Action (Live or Drop)
Tags (Hazard, Overweight, Bonded, Urgent, Not Release Pull, etc.)
Add Extra Stop

### Actions

Plan - Container Instructions
Clean - Container Instructions
Save - Delivery Order
Cancel - Delivery Order

### Special Instructions

Field to input container specific notes, or instructions
Temperature
GPS / insurance specifications
Miscellaneous

### Multiple Select

Average containers per order is around 7
Sometimes containers in an order can be 50 or more
Multiple select must allow ( All Containers, Selected Containers, This Container) in order to enter delivery instructions
There must be an indicator to the user that a container has been configured, and another to prompt the user to configure
