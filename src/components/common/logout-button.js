import React, { forwardRef } from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import MenuItem from '@material-ui/core/MenuItem'
import { logout } from '../../services/auth'

const LogoutButton = forwardRef((_, ref) => {
  const client = useApolloClient()
  return (
    <MenuItem
      ref={ref}
      onClick={() => {
        client.writeData({ data: { isLoggedIn: false } })
        logout(() => {})
      }}
    >
      Logout
    </MenuItem>
  )
})

export default LogoutButton
