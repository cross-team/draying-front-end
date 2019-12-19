import React from 'react'
import { ApolloProvider } from './providers'

const wrapRootElement = ({ element }) => {
  return <ApolloProvider>{element}</ApolloProvider>
}

export default wrapRootElement
