import React from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Avatar from '@material-ui/core/Avatar'
import LogoutButton from '../common/logout-button'

export default function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  return (
    <>
      <Avatar onClick={handleClick}>AB</Avatar>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem disabled>user@email.com</MenuItem>
        <MenuItem onClick={handleClose}>Change Password</MenuItem>
        <LogoutButton />
      </Menu>
    </>
  )
}
