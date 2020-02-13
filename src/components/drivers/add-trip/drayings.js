import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Typography from '@material-ui/core/Typography'
import Loading from '../../loading'
import DrayingCard from './draying-card'

export const GET_AVAILABLE_DRAYINGS = gql`
  query getAvailableDrayings(
    $currentLocationTypes: [Int]
    $orderBy: String
    $searchBookings: String
  ) {
    drayings(
      first: 1000
      containerStages: [5, 6, 7, 8]
      currentLocationTypes: $currentLocationTypes
      orderBy: $orderBy
      searchBookings: $searchBookings
    ) {
      edges {
        cursor
        draying: node {
          __typename
          id
          container
          priority
          cutOffDate
          booking
          appointments {
            id
            __typename
            appointmentDate
            appointmentTime
            extraStop {
              id
              __typename
              deliveryLocation {
                __typename
                nickName
              }
            }
            type {
              id
              __typename
              shortName
            }
          }
          extraStops {
            __typename
            id
            deliveryLocation {
              id
              __typename
              nickName
            }
          }
          deliveryLocation {
            id
            __typename
            nickName
            locationType {
              id
              __typename
            }
          }
          portStatus {
            id
            __typename
            name
          }
          loadType {
            id
            __typename
            name
          }
          containerSize {
            __typename
            id
            name
          }
          containerType {
            __typename
            id
            name
          }
          shippingLine {
            id
            __typename
            name
          }
          terminalLocation {
            id
            __typename
            nickName
          }
          returnTerminal {
            __typename
            id
            nickName
          }
          order {
            __typename
            id
          }
          client {
            id
            __typename
            companyName
          }
          containerStage {
            __typename
            id
          }
          trips {
            id
            __typename
            status {
              id
              __typename
            }
          }
        }
      }
    }
  }
`

const Drayings = ({ orderBy, searchBookings, currentLocationTypes }) => {
  const { data, loading, error } = useQuery(GET_AVAILABLE_DRAYINGS, {
    variables: {
      orderBy,
      searchBookings,
      currentLocationTypes,
    },
    fetchPolicy: 'cache-and-network',
  })

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Typography>Error</Typography>
  }

  return (
    <>
      {data.drayings.edges.map(edge => (
        <DrayingCard key={edge.cursor} draying={edge.draying} />
      ))}
    </>
  )
}

// lastTrip

// lost no actions

export default Drayings
