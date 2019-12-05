import { mockFeed } from './data.mock';
import { getFeed, updateUser } from './services';

jest.mock('axios');

describe('Feed/services', () => {
  let setFeed: jest.Mock;
  let setLoading: jest.Mock;
  let getTokenSilently: jest.Mock;
  let axios = require('axios');
  beforeEach(() => {
    setFeed = jest.fn();
    setLoading = jest.fn();
    getTokenSilently = jest.fn();
  });

  test('getFeed()', async () => {
    axios.default.get.mockResolvedValue({ data: mockFeed });

    await getFeed(setFeed, setLoading, getTokenSilently);

    const parsedMockFeed = mockFeed.map(item => ({
      ...item,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt)
    }));
    expect(getTokenSilently).toBeCalled();
    expect(setLoading).toBeCalledTimes(2);
    expect(setFeed).toBeCalledWith(parsedMockFeed);
  });

  test('updateUser()', async () => {
    axios.default.post.mockResolvedValue({});

    await updateUser(setLoading, getTokenSilently);

    expect(setLoading).toBeCalledTimes(2);
    expect(getTokenSilently).toBeCalled();
    expect(axios.default.post).toBeCalled();
  });
});
