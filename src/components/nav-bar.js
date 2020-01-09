import { Link, navigate } from 'gatsby'
import { isLoggedIn, logout } from '../services/auth'
import React from 'react'
import {
  makeStyles,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  IconButton,
  Avatar,
  Menu,
  MenuItem
} from '@material-ui/core/'
import TruckIcon from '@material-ui/icons/LocalShipping'
import MenuIcon from '@material-ui/icons/Menu'
import DrawerMenu from './drawer-menu'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'sticky'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  iconButton: {
    color: theme.palette.primary.contrastText,
  }
}))

export default function NavBar() {
  const classes = useStyles()
  const [tab, setTab] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleChange = (event, newTab) => {
    setTab(newTab);
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(open);
  };

  return (
    <AppBar className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <IconButton onClick={toggleDrawer(true)} className={classes.iconButton} aria-label='Menu Button'>
          <MenuIcon />
        </IconButton>
        <Tabs value={tab} onChange={handleChange}>
          <Tab label='DRIVERS' icon={<TruckIcon />} />
          <Tab label='ORDERS' icon={<TruckIcon />} />
          <Tab label='CLIENTS' icon={<TruckIcon />} />
        </Tabs>
        <Avatar onClick={handleClick}>AB</Avatar>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem disabled>user@email.com</MenuItem>
          <MenuItem onClick={handleClose}>Change Password</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
        <DrawerMenu open={open} toggleDrawer={toggleDrawer}/>
      </Toolbar>
    </AppBar>
  )
}
