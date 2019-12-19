import React from 'react'
import { Link, navigate } from 'gatsby'
import { isLoggedIn, logout } from '../services/auth'
import Button from '@material-ui/core/Button'

export default () => {
  const content = { message: '', login: true }
  if (isLoggedIn()) {
    content.message = `Hello, you are logged in`
  } else {
    content.message = 'You are not logged in'
  }
  return (
    <div
      style={{
        display: 'flex',
        flex: '1',
        justifyContent: 'space-between',
        borderBottom: '1px solid #d1c1e0',
      }}
    >
      <span>{content.message}</span>
      <nav>
        <Link to="/">
          <Button>Home</Button>
        </Link>
        {` `}
        {isLoggedIn() ? (
          <>
            <Link to="/app/profile">
              <Button>Profile</Button>
            </Link>
            <Link to="/app/dispatch">
              <Button>Dispatch</Button>
            </Link>
            <Link
              to="/"
              onClick={event => {
                event.preventDefault()
                logout(() => navigate(`/app/login`))
              }}
            >
              <Button>Logout</Button>
            </Link>
          </>
        ) : null}
      </nav>
    </div>
  )
}
