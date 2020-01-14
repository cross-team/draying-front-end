import React from 'react'
import { logout } from '../../services/auth'
import { navigate } from 'gatsby'
import { Menu, MenuItem, Avatar } from '@material-ui/core/'

export default function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onLogout = () => {
    handleClose()
    logout(() => navigate(`/app/login`))
  }

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  return (
    <>
      <Avatar onClick={handleClick}>AB</Avatar>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem disabled>user@email.com</MenuItem>
        <MenuItem onClick={handleClose}>Change Password</MenuItem>
        <MenuItem onClick={onLogout}>Logout</MenuItem>
      </Menu>
    </>
    
  )
}
