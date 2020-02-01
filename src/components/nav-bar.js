import React from 'react'
import { makeStyles, AppBar, Toolbar, Tabs, Tab } from '@material-ui/core/'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTruckMoving,
  faContainerStorage,
  faPersonDolly,
} from '@fortawesome/pro-light-svg-icons/'
import { navigate } from 'gatsby'
import DrawerMenu from './menus/drawer-menu'
import UserMenu from './menus/user-menu'

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}))

export default function NavBar() {
  const classes = useStyles()
  const [tab, setTab] = React.useState(0)

  const handleChange = (event, newTab) => {
    setTab(newTab)
  }

  return (
    <AppBar position="sticky">
      <Toolbar className={classes.toolbar}>
        <DrawerMenu />
        <Tabs value={tab} onChange={handleChange}>
          <Tab
            label="DRIVERS"
            icon={
              <FontAwesomeIcon
                icon={faTruckMoving}
                onClick={() => navigate(`/app/drivers`)}
              />
            }
          />
          <Tab
            label="ORDERS"
            icon={<FontAwesomeIcon icon={faContainerStorage} />}
          />
          <Tab
            label="CLIENTS"
            icon={<FontAwesomeIcon icon={faPersonDolly} />}
          />
        </Tabs>
        <UserMenu />
      </Toolbar>
    </AppBar>
  )
}
