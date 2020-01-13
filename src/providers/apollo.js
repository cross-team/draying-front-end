import React from 'react'

import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider } from '@apollo/react-hooks'
import { resolvers, typeDefs } from '../resolvers'
import { getUser } from '../services/auth'

const cache = new InMemoryCache()
const hasToken = !!getUser().token
const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: process.env.MIDDLE_END_URL || 'https://dev-draying-graphql.azurewebsites.net',
    headers: {
      authorization: hasToken ? `Bearer ${getUser().token}` : '',
      'client-name': 'Draying.io [web]',
      'client-version': '1.0.0',
    },
    credentials: 'include',
  }),
  resolvers,
  typeDefs,
})

cache.writeData({
  data: {
    isLoggedIn: !!getUser(),
    columnState: {
      leftHidden: false,
      middleHidden: false,
      rightHidden: true
    }
  },
})

function Apollo({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
export default Apollo
