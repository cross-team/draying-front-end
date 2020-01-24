import gql from 'graphql-tag'
import { GET_COLUMN_STATE } from './components/columns/shell'
import { GET_DISPATCH_STATE } from './components/drivers/driver-trips'

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    columnState: ColumnState!
    dispatchState: DispatchState!
  }

  extend type Mutation {
    setColumnState(hideLeft: Boolean, hideMiddle: Boolean, hideRight: Boolean): ColumnState!
    setDispatchState(selectedDriver: SelectedDriver, selectedDate: Date): DispatchState!
  }

  type ColumnState {
    leftHidden: Boolean!
    middleHidden: Boolean!
    rightHidden: Boolean!
  }

  type DispatchState {
    selectedTrip: SelectedTrip!
    selectedDriver: SelectedDriver!
    selectedDate: Date!
  }

  type SelectedTrip {
    id: String!
  }

  type SelectedDriver {
    id: String!
    firstName: String!
    lastName: String!
    phone: String!
  }

  type Date {
    day: Int!
    month: Int!
    year: Int!
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
    setDispatchState: (_root, { selectedTrip, selectedDriver, selectedDate }, { cache }) => {
      const { dispatchState } = cache.readQuery({
        query: GET_DISPATCH_STATE
      })
      let data = dispatchState

      if (selectedDate) {
        const { day, month, year } = selectedDate
        data.selectedDate = {
          __typename: 'Date',
          day,
          month,
          year
        }
      }
      if (selectedDriver) {
        const { id, firstName, lastName, phone } = selectedDriver
        data.selectedDriver = {
          __typename: 'SelectedDriver',
          id,
          firstName,
          lastName,
          phone
        }
      }
      if (selectedTrip) {
        const { id } = selectedTrip
        data.selectedTrip = {
          __typename: 'SelectedTrip',
          id,
        }
      }
      cache.writeData({ data: {
        dispatchState: {
          __typename: 'DispatchState',
          ...data,
        }
      }})
      return null;
    },
  },
}
