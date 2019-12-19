import React from 'react'
import { Link, navigate } from 'gatsby'
import { isLoggedIn, logout } from '../services/auth'

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
        <Link to="/">Home | </Link>
        {` `}
        {isLoggedIn() ? (
          <>
            <Link to="/app/profile">Profile | </Link>
            <Link to="/app/dispatch">Dispatch | </Link>
            <Link
              href="/"
              onClick={event => {
                event.preventDefault()
                logout(() => navigate(`/app/login`))
              }}
            >
              Logout
            </Link>
          </>
        ) : null}
      </nav>
    </div>
  )
}
