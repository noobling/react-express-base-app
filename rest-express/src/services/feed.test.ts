import feed from './feed';

describe('services/feed', () => {
  it('feed()', async () => {
    const photon: any = { messages: { findMany: jest.fn() } };
    await feed(photon);
    expect(photon.messages.findMany).toBeCalledWith({
      include: {
        author: true
      },
      last: 5
    });
  });
});
