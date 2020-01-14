import gql from 'graphql-tag'
import { GET_COLUMN_STATE } from './components/columns/shell'

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    columnState: ColumnState!
  }

  extend type Mutation {
    setColumnState(hideLeft: Boolean, hideMiddle: Boolean, hideRight: Boolean): ColumnState!
  }

  type ColumnState {
    leftHidden: Boolean!
    middleHidden: Boolean!
    rightHidden: Boolean!
  }

`

export const resolvers = {
  Mutation: {
    setColumnState: (_root, { hideLeft, hideMiddle, hideRight }, { cache }) => {
      const { columnState } = cache.readQuery({
        query: GET_COLUMN_STATE
      });

      let data = columnState
      if (typeof hideLeft != undefined) data = { ...data, leftHidden: hideLeft }
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
  },
}
