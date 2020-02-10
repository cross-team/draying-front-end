import gql from 'graphql-tag'

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    columnState: ColumnState!
    dispatchState: DispatchState!
    currentTrip(tripId: Int!): Trip!
  }

  extend type Mutation {
    setColumnState(
      hideLeft: Boolean
      hideMiddle: Boolean
      hideRight: Boolean
    ): ColumnState!

    setDispatchState(
      selectedTrip: SelectedTripInput
      selectedDriver: SelectedDriverInput
      selectedDate: DateInput
    ): DispatchState!
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

  input SelectedTripInput {
    id: String!
  }

  type SelectedDriver {
    id: String!
    firstName: String!
    lastName: String!
    phone: String!
  }

  input SelectedDriverInput {
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

  input DateInput {
    day: Int!
    month: Int!
    year: Int!
  }
`
