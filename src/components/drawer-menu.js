import React from 'react'
import {
  makeStyles,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Collapse
} from '@material-ui/core/'
import LessIcon from '@material-ui/icons/ExpandLess';
import MoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  root: {
    width: '256px',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function DrawerMenu(props) {
  const classes = useStyles()
  const [dispatching, setDispatching] = React.useState(false);
  const [drivers, setDrivers] = React.useState(false);
  const [orders, setOrders] = React.useState(false);
  const [clients, setClients] = React.useState(false);
  const [preferences, setPreferences] = React.useState(false);

  const handleDispatching = () => {
    setDispatching(!dispatching)
  }

  const handleDrivers = () => {
    setDrivers(!drivers)
  }

  const handleOrders = () => {
    setOrders(!orders)
  }

  const handleClients = () => {
    setClients(!clients)
  }

  const handlePreferences = () => {
    setPreferences(!preferences)
  }

  return (
    <Drawer open={props.open} onClose={props.toggleDrawer(false)}>
      <List className={classes.root}>
        <ListItem button onClick={handleDispatching}>
          <ListItemText primary="Dispatching" />
          {dispatching ? <LessIcon /> : <MoreIcon />}
        </ListItem>
        <Collapse in={dispatching} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemText primary="Drivers" />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemText primary="Orders" />
            </ListItem>
          </List>
        </Collapse>
        <ListItem button onClick={handleDrivers}>
          <ListItemText primary="Drivers" />
          {drivers ? <LessIcon /> : <MoreIcon />}
        </ListItem>
        <Collapse in={drivers} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemText primary="Drivers" />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemText primary="Trucks" />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemText primary="Payments" />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemText primary="Add Payment" />
            </ListItem>
          </List>
        </Collapse>
        <ListItem button onClick={handleOrders}>
          <ListItemText primary="Orders" />
          {orders ? <LessIcon /> : <MoreIcon />}
        </ListItem>
        <Collapse in={orders} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemText primary="Orders" />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemText primary="Add Order" />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemText primary="Order Status" />
            </ListItem>
          </List>
        </Collapse>
        <ListItem button onClick={handleClients}>
          <ListItemText primary="Clients" />
          {clients ? <LessIcon /> : <MoreIcon />}
        </ListItem>
        <Collapse in={clients} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemText primary="Clients" />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemText primary="Orders" />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemText primary="Invoices" />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemText primary="Rates" />
            </ListItem>
          </List>
        </Collapse>
        <ListItem button onClick={handlePreferences}>
          <ListItemText primary="Preferences" />
          {preferences ? <LessIcon /> : <MoreIcon />}
        </ListItem>
        <Collapse in={preferences} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemText primary="General" />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemText primary="Users" />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemText primary="Company" />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemText primary="Pricing" />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemText primary="Locations" />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </Drawer>
  )
}
