import React, { Fragment } from 'react'
import { getUser } from '../services/auth'
// import { useQuery } from '@apollo/react-hooks'
// import gql from 'graphql-tag'

// import { Loading } from '.'

// export const GET_MY_PROFILE = gql`
//   query GetMyProfie {
//     me {
//       id
//       email
//     }
//   }
// `

export default function Profile() {
  // const { data, loading, error } = useQuery(GET_MY_PROFILE, {
  //   fetchPolicy: 'network-only',
  // })
  // if (loading) return <Loading />
  // if (error) return <p>ERROR: {error.message}</p>

  return (
    <Fragment>
      <>My Profile</>
      {getUser().email ? <div>{getUser().email}</div> : <p>No Data</p>}
    </Fragment>
  )
}
