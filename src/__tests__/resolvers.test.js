import { resolvers } from '../resolvers'
import { GET_COLUMN_STATE } from '../components/columns/shell'

const cache = {
  readQuery: jest.fn(),
  writeData: jest.fn(),
}

describe('resolvers.Mutation', () => {
  it('sets columnState correctly', () => {
    const { Mutation: { setColumnState } } = resolvers
    cache.readQuery.mockReturnValueOnce({
      columnState: {
        leftHidden: false, 
        middleHidden: false,
        rightHidden: false,
      }
    })
    setColumnState(null, { hideLeft: false, hideMiddle: false, hideRight: true }, { cache })
    expect(cache.readQuery).toHaveBeenCalled({
      query: GET_COLUMN_STATE
    })
  })
})