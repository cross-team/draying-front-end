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
  Avatar
} from '@material-ui/core/'
import {
  LocalShipping,
  Menu
} from '@material-ui/icons/'

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  }
}))

export default function PrimarySearchAppBar() {
  const classes = useStyles()
  const [tab, setTab] = React.useState(0);

  const handleChange = (event, newTab) => {
    setTab(newTab);
  };

  return (
    <AppBar>
      <Toolbar className={classes.toolbar}>
        <IconButton>
          <Menu />
        </IconButton>
        <Tabs value={tab} onChange={handleChange}>
          <Tab label='DRIVERS' icon={<LocalShipping />} />
          <Tab label='ORDERS' icon={<LocalShipping />} />
          <Tab label='CLIENTS' icon={<LocalShipping />} />
        </Tabs>
        <Avatar>IO</Avatar>
      </Toolbar>
    </AppBar>
  )
}
