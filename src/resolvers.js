import gql from 'graphql-tag'
import { GET_COLUMN_STATE } from './components/columns/shell'

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    columnState: ColumnState!
    dispatchState: DispatchState!
  }

  extend type Mutation {
    setColumnState(hideLeft: Boolean, hideMiddle: Boolean, hideRight: Boolean): ColumnState!
    setDispatchState(selectedDriver: ID): DispatchState!
  }

  type ColumnState {
    leftHidden: Boolean!
    middleHidden: Boolean!
    rightHidden: Boolean!
  }

  type DispatchState {
    selectedDriver: ID!
  }

`

export const resolvers = {
  Mutation: {
    setColumnState: (_root, { hideLeft, hideMiddle, hideRight }, { cache }) => {
      const { columnState } = cache.readQuery({
        query: GET_COLUMN_STATE
      });

      let data = columnState
      if (hideLeft != undefined) data = { ...data, leftHidden: hideLeft }
      if (hideMiddle != undefined) data = { ...data, middleHidden: hideMiddle }
      if (hideRight != undefined) data = { ...data, rightHidden: hideRight }

      // cache.writeData({data: { columnState: {...data, __typename: 'ColumnState'} } });
      cache.writeData({ data: {
        columnState: {
          __typename: 'ColumnState',
          ...data,
        }
      }})
      

      return null;
    },
    setDispatchState: (_root, { selectedDriver }, { cache }) => {
      cache.writeData({ data: {
        dispatchState: {
          __typename: 'DispatchState',
          selectedDriver: selectedDriver,
        }
      }})
      return null;
    },
  },
}
