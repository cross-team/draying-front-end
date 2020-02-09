import React, { useEffect } from 'react'
import { Link, navigate } from 'gatsby'

const NotFoundPage = () => {
  useEffect(() => {
    setTimeout(() => navigate('/'), 4000)
  })
  return (
    <>
      <h1>NOT FOUND</h1>
      <p>Redirecting</p>

      <Link to="/">Go To Home -></Link>
    </>
  )
}

export default NotFoundPage
