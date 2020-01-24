import { resolvers } from '../resolvers'
import { GET_COLUMN_STATE } from '../components/columns/shell'

const cache = {
  readQuery: jest.fn(),
  writeData: jest.fn(),
}

beforeEach(() => {
  jest.clearAllMocks()
})

const { Mutation: { setColumnState } } = resolvers

describe('resolvers.Mutation', () => {
  it('maintains columnState intial state', () => {
    cache.readQuery.mockReturnValue({
      columnState: {
        leftHidden: false, 
        middleHidden: false,
        rightHidden: false,
      }
    })
    
    setColumnState(null, { hideLeft: false, hideMiddle: false, hideRight: true }, { cache })
    expect(cache.readQuery).toBeCalledWith({
      query: GET_COLUMN_STATE
    })
    expect(cache.writeData).toBeCalledWith({
      data: {
        columnState: {
          __typename: "ColumnState",
          leftHidden: false,
          middleHidden: false,
          rightHidden: true
        }
      }
    })
  })
  it("it return intial state if passed no arguments", () => {
    cache.readQuery.mockReturnValue({
      columnState: {
        leftHidden: false, 
        middleHidden: false,
        rightHidden: false,
      }
    })
    
    setColumnState(null, { hideLeft: undefined, hideMiddle: undefined, hideRight: undefined }, { cache })
    expect(cache.writeData).toBeCalledWith({
      data: {
        columnState: {
          __typename: "ColumnState",
          leftHidden: false,
          middleHidden: false,
          rightHidden: false
        }
      }
    })
  })

  it("it sets all values to true", () => {
    cache.readQuery.mockReturnValue({
      columnState: {
        leftHidden: false, 
        middleHidden: false,
        rightHidden: false,
      }
    })

    setColumnState(null, { hideLeft: true, hideMiddle: true, hideRight: true }, { cache })
    expect(cache.writeData).toBeCalledWith({
      data: {
        columnState: {
          __typename: "ColumnState",
          leftHidden: true,
          middleHidden: true,
          rightHidden: true
        }
      }
    })
  })
})